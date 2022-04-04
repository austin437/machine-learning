TODO

-   ProcessData:

    -   Add mini-table (feature, average, prediction) for features that have been selected
        -In this table a user can select predictions for the given label
        by entering a value for each feature.
        -Required

    -   Add averages next to each prediction
    -   Column simply calculates the average mean value for each column
    -   It will help when user is predicting values

    -   Add test for useActions

-   Convert styles to StyleSheet (material-ui)

-   Change to project machine learning.
-   Create front page with option for gradient descent
-   Load to GH pages.

DONE

-   Move logic into component
-   Convert useState into useReducer.
-   Implement useActions pattern on reducer.
-   Create FeatureSelector Form to list "features" along with their
    data types and a check to indicate whether they should be selected
    or not (only numeric data types should be available for selection)
-   FeatureSelector: Do not show table/submit if data=[]
-   Create test-utils file for rendering all components with a router
-   Add hashbang routing???
    -   Next page after Feature Selector should be the page that performs the
        algorithm and prints console logs to screen.
-   Get features labels based upon passed in state data.
-   Update LoadOptions to only include numeric fields in the Prediction drop down
