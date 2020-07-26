module.exports = {
    extends: ["hive", "hive/prettier", "eslint:recommended", "plugin:react/recommended"],
    parser: "babel-eslint",
    settings: {
        react: {
            createClass: "createReactClass",
            pragma: "React",
            version: "detect",
            flowVersion: "0.53"
        },
        propWrapperFunctions: [
            "forbidExtraProps",
            {
                property: "freeze",
                object: "Object"
            },
            {
                property: "myFavoriteWrapper"
            }
        ],
        linkComponents: [
            "Hyperlink",
            {
                name: "Link",
                linkAttribute: "to"
            }
        ]
    }
};
