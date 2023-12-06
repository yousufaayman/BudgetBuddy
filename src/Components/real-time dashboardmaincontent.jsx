const user = getCookie("__tK__");
const userID = user.uid;

const getBalance = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/user/getBalance/${userID}`);
    if (data && data.hasBalance) {
      setBalance(data.balance);
    }
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(()=>{
  getBalance()
}, [refreshTable])

<div className="balance">
          <TbPigMoney />Real-Time Balance: {balance? balance: ""}
        </div>