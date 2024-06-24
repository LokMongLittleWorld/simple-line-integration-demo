function Index() {
  const clientID = import.meta.env.VITE_LINE_CLIENT_ID;
  const redirect_uri = "http://localhost:5173/callback";
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    localStorage.setItem("state", result);
    return result;
  };

  const newState = localStorage.getItem("state") || generateRandomString(16);

  const requestURL =
    "https://access.line.me/oauth2/v2.1/authorize?" +
    `response_type=code&client_id=${clientID}` +
    `&redirect_uri=${redirect_uri}` +
    `&state=${newState}` +
    "&scope=profile%20openid%20email" +
    "&nonce=09876xyz";

  const handleOnClick = () => {
    window.location.href = requestURL;
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex justify-center items-center text-3xl font-bold h-dvh"
    >
      <div
        className="px-6 py-4 rounded-lg bg-green-500 text-white cursor-pointer select-none
        transition duration-300 ease-in-out translate hover:-translate-y-1"
      >
        Line Authentication
      </div>
    </div>
  );
}

export default Index;
