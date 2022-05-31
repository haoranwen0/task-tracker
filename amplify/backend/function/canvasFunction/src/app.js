/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/
const accessToken =
  "7867~PJeWLR4MlV7mWiIdsXomeZGA6abfePtzS5mdxCaOja5NNzXlT6eh2awPlsg9Jy7e";

async function getCourseID() {
  const coursesUrl = `https://canvas.mit.edu/api/v1/courses?per_page=50&access_token=${accessToken}`;
  const currentTermId = 204;
  const response = await axios.get(coursesUrl);
  var currentCourses = response["data"].filter(function (el) {
    return el.enrollment_term_id == currentTermId;
  });
  var courseID = currentCourses.map(function (i) {
    return i.id;
  });
  var idToCourse = [];
  for (let i = 0; i < currentCourses.length; i++) {
    idToCourse[currentCourses[i].id] = currentCourses[i].course_code;
  }
  return [courseID, idToCourse];
}

async function getAllAssignments(courseID, idToCourse) {
  let allAssignments = [];
  for (let i = 0; i < courseID.length; i++) {
    let assignmentUrl = `https://canvas.mit.edu/api/v1/courses/${courseID[i]}/assignments?per_page=50&access_token=${accessToken}`;
    const response = await axios.get(assignmentUrl);
    for (let j = 0; j < response["data"].length; j++) {
      allAssignments.push({
        name: response["data"][j].name,
        deadline: response["data"][j].due_at,
        course: idToCourse[courseID[i]],
      });
    }
  }
  return allAssignments;
}

function sortAssignments(assignments) {
  let sortedAssignments = [...assignments]
    .sort(function (a, b) {
      return new Date(b.deadline) - new Date(a.deadline);
    })
    .reverse();

  let ans = [];
  if (sortedAssignments.length === 0) {
    return ans;
  }
  let prev_deadline =
    sortedAssignments[0].deadline === null
      ? null
      : sortedAssignments[0].deadline.split("T")[0];
  let curr_assignments = [sortedAssignments[0]];
  for (let i = 1; i < sortedAssignments.length; i++) {
    let curr_deadline =
      sortedAssignments[i].deadline === null
        ? null
        : sortedAssignments[i].deadline.split("T")[0];
    if (prev_deadline === curr_deadline) {
      curr_assignments.push(sortedAssignments[i]);
    } else {
      ans.push(curr_assignments);
      curr_assignments = [sortedAssignments[i]];
      prev_deadline = sortedAssignments[i].deadline.split("T")[0];
    }
  }
  ans.push(curr_assignments);
  return ans;
}

app.get("/canvas", async function (req, res) {
  try {
    const result = await getCourseID();
    const courseID = result[0];
    const idToCourse = result[1];
    const allAssignments = await getAllAssignments(courseID, idToCourse);
    const sortedAssignments = sortAssignments(allAssignments);
    res.json({ status: "success", data: sortedAssignments });
  } catch (error) {
    res.json({ status: "fail", data: error });
  }
});

app.get("/canvas/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/canvas", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/canvas/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/canvas", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/canvas/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/canvas", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/canvas/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
