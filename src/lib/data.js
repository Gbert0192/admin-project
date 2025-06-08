export const getRecentActivities = () => {
  return [
    { type: "create", message: 'Form "Satisfaction Survey" created' },
    { type: "update", message: 'Question added to "Registration"' },
    { type: "submit", message: 'Response from "User B"' },
    { type: "login", message: "Admin logged in" },
  ];
};
