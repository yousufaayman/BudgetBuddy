export const InpurVerification = ({nextstep, handleChange, values}) =>{
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
  
    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const handleInputChange = (e) => {
      const input = e.target.value;
      handleChange(input)
      setEmail(input);
      setIsValid(validateEmail(input));
    };
  
    const Continue = e => {
      e.preventDefault();
      if (isValid) {
        if (values.password == values.check_password){
          nextStep();
        }
        else{
          console.log(values.check_password, values.password,'pass error');
        }
      } else {
        console.log(values.email, 'Invalid email address');
      }
    }

    return Continue
}