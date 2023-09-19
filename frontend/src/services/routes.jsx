const routes = [
    {
        role: "head",
        routes: [
            {
                path: "/userAccounts",
                element: "<EditUserAccountRequest/>"
            },
            {
                path: "/userAccounts/:id",
                element: "<EditUserAccountRequest/>"
            },
            {
                path: "/editUserAccess/:id",
                element: "<EditUserAccess/>"
            },
            {
                path: "profile",
                element: "<UserProfile/>"
            },
            {
                path: "/settings",
                element: "<Setting/>"
            },
            {
                path: "/editprofile",
                element: "<EditUserProfile/>"
            }
        ]
    },
    {
        role: "staff",
        routes: [
            {
                path: "/",
                element: "<TmpCpm/>"
            },
            {
                path: "/profile",
                element: "<UserProfile/>"
            },
            {
                path: "/event",
                element: "<Events/>"
            },
            {
                path: "/addevent",
                element: "<AddEvents/>"
            },
            {
                path: "/settings",
                element: "<Setting/>"
            },
            {
                path: "/editprofile",
                element: "<EditUserProfile/>"
            }
        ],
    },
    {
        role: "system coordinator",
        routes: [
            {
                path: "/",
                element: "<TmpCpm/>"
            },
            {
                path: "/event",
                element: "<Event/>"
            },
            {
                path: "/addevent",
                element: "<AddEvent/>"
            },
            {
                path: "/userAccounts",
                element: "<EditUserAccountRequest/>"
            },
            {
                path: "/userAccounts/:id",
                element: "<EditUserAccountRequest/>"
            },
            {
                path: "/editUserAccess/:id",
                element: "<EditUserAccess/>"
            },
            {
                path: "profile",
                element: "<UserProfile/>"
            },
            {
                path: "/settings",
                element: "<Setting/>"
            },
            {
                path: "/editprofile",
                element: "<EditUserProfile/>"
            }
        ]
    },
    {
        role: "standard user",
        routes: [
            {
                path: "/",
                element: "<TmpCpm/>"
            },
            {
                path: "/profile",
                element: "<UserProfile/>"
            },
            {
                path: "/event",
                element: "<Events/>"
            },
            {
                path: "/addevent",
                element: "<AddEvents/>"
            },
            {
                path: "/settings",
                element: "<Setting/>"
            },
            {
                path: "/editprofile",
                element: "<EditUserProfile/>"
            }
        ]
    }
];

export default routes;