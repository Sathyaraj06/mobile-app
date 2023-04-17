export let constant = {

    // auth
    success_response: 'Successfully completed the request!!',
    faliure_response: 'Failed to complete the request!!',

    //Azure App Configuration keys
    chathub: "url:chathub",
    blob: "storage:blob",
    dashboardapi: "url:dashboardapi",
    instrumentationKey: "dashboardui:instrumentationKey",

    TimeRange: {
        Last24Hours: 'Last 24 Hours',
        Last7Days: 'Last 7 Days',
        Last1Month: 'Last 1 Month',
        Last3Months: 'Last 3 Months',
        Last6Months: 'Last 6 Months',
        Last1Year: 'Last 1 Year',
        Custom: 'Custom Range'
    },

    //key words
    keyvalues: [
        { value: "WelcomeCard", view: "Welcome Message", type: "card", display: true },
        { value: "Unauthorized", view: "Unauthorized Message", type: "card", display: true },
        { value: "DuplicateDevice", view: "Duplicate Device Login Message", type: "card", display: true },
        { value: "InvalidAgent", view: "Invalid Agent Message", type: "card", display: true },
        { value: "AgentIntro", view: "Agent Intro Message", type: "card", display: true },
        { value: "OutOfBusinnessHours", view: "Out Of Businness Hours Message", type: "card", display: true },
        { value: "MobileNotificationMsg", view: "Mobile Notification Title", type: "card", display: true },
        { value: "AgentTimeout", view: "Agent Busy Timeout Message", type: "card", display: true },
        { value: "AgentInterval", view: "Agent Busy Interval Message", type: "card", display: true },
        { value: "UserEndedMsgforUser", view: "User Ended Message for User", type: "card", display: true },
        { value: "UserEndedMsgforAgent", view: "User Ended Message for Agent", type: "card", display: true },
        { value: "AgentEndedMsgforAgent", view: "Agent Ended Message for Agent", type: "card", display: true },
        { value: "AgentEndedMsgforUser", view: "Agent Ended Message for User", type: "card", display: true },
        { value: "BodyWrapper", view: "Chat Message Wrapper", type: "card", display: true },
        { value: "BusyResponseTimeInterval", view: "Busy Response Time Interval (secs)", type: "number", display: true },
        { value: "BusyResponseMaxCount", view: "Busy Response Max Count", type: "number", display: true }
    ],

    adaptiveCardScheme: {
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        body: [ ],
        type: "AdaptiveCard",
        version: "1.0"
      }

}


export let role = {
    admin: "Admin",
    agent: "Agent"
}