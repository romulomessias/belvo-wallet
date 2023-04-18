import btcLogo from "/btc.svg";
import ethLogo from "/eth.svg";
import dogeLogo from "/doge.svg";
import arrowUp from "/arrow-up.svg";
import arrowDown from "/arrow-down.svg";

export const walletTypeMap = {
  ETH: {
    name: "Ethereum",
    logo: ethLogo,
  },
  DOGE: {
    name: "Dogecoin",
    logo: dogeLogo,
  },
  BTC: {
    name: "Bitcoin",
    logo: btcLogo,
  },
};

export const transactionTypeMapper = {
  sent: {
    icon: arrowUp,
    responsible: "receiver",
    description: "Sent",
  },
  received: {
    icon: arrowDown,
    responsible: "sender",
    description: "Received",
  },
};
