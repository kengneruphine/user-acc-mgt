const checkDateOfBirth = (date, text) => {
    const currentDate = new Date();
    const birthDate = new Date(date);
    if (birthDate > currentDate) throw new Error(`${text} cannot be in the future`);
  };
  
  export default checkDateOfBirth;
  