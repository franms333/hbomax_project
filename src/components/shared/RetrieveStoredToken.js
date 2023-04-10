import CalculateRemainingTime from './CalculateRemainingTime';

const RetrieveStoredToken = () => {
    
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = CalculateRemainingTime(storedExpirationDate);

    if(remainingTime <= 60000){        
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }    

    return {token:storedToken, duration:remainingTime}
}

export default RetrieveStoredToken;