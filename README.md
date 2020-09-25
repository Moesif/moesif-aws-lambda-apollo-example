# Moesif AWS Lambda Apollo GraphQL Example


[Moesif](https://www.moesif.com/features/graphql-analytics) is an API Analytics and monitoring platform for [GraphQL](https://www.moesif.com/features/graphql-analytics).

[Apollo](https://www.apollographql.com/) is a popular frameworks for creating and using [GraphQL](https://graphql.org/learn/) in the Node.js ecosystem.

This example is an aws lambda application with Moesif's API analytics and monitoring integrated.

## How to run this example

- Create an AWS S3 bucket.

- Create the template (`template.yaml`). This will look for a file called graphql.js with the export graphqlHandler. It creates one API endpoints:
    `/graphql (GET and POST)`

- Package source code and dependencies

    ```bash
    aws cloudformation package \
    --template-file template.yaml \
    --output-template-file serverless-output.yaml \
    --s3-bucket <bucket-name>
    ```
    This will read and transform the template, created in previous step. Package and upload the artifact to the S3 bucket and generate another template for the deployment.


- Deploy the API

    ```
    aws cloudformation deploy \
    --template-file serverless-output.yaml \
    --stack-name prod \
    --capabilities CAPABILITY_IAM
    ```
    This will create the Lambda Function and API Gateway for GraphQL. In this example, we use `prod` as stack name but any stack name could be used.

- You will also want to add an environment vairable MOESIF_APPLICATION_ID with the value being your application id from your Moesif account

    Your Moesif Application Id can be found in the [_Moesif Portal_](https://www.moesif.com/).
    After signing up for a Moesif account, your Moesif Application Id will be displayed during the onboarding steps. 

    You can always find your Moesif Application Id at any time by logging 
    into the [_Moesif Portal_](https://www.moesif.com/), click on the top right menu,
    and then clicking _Installation_.

- Go to the URL for the API gateway such as https://XXXXXX.execute-api.us-west-2.amazonaws.com/default/my-test-function

- The API Calls should show up in Moesif.

For more information on what you can do with [API analytics for GraphQL check out here](https://www.moesif.com/docs/platform/graphql/).
