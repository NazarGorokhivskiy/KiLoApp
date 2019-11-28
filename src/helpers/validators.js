export const validateEmail = value => {
  const emailRegex = new RegExp(
    [
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      "[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+",
      "[a-zA-Z]{2,}))$",
    ].join(""),
  );

  return emailRegex.test(value);
};

export const validatePassword = value => {
  return value && value.length >= 8;
};

export const validatePhoneNumber = value => {
  const phoneNumberRegex = /^[+]?[(]?[0-9]{1,4}[)]?[0-9]{6,10}$/;

  return phoneNumberRegex.test(value);
};
