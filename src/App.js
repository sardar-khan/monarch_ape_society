import { useEffect, useState, Fragment, useRef } from "react";
import "./App.css";
import { BigNumber, ethers } from "ethers";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
import cyberShareABI from "./cyberShareABI.json";
// const fs = require("fs");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Dialog, Transition } from "@headlessui/react";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [chainId, setChainId] = useState("");
  const [owner, setOwner] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPreSale, setIsPreSale] = useState(false);
  const [maxMint, setMaxMint] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  console.log(chainId);
  // Dialog

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal1() {
    setIsOpen1(false);
  }

  function openModal1() {
    setIsOpen1(true);
  }
  function closeModal2() {
    setIsOpen2(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  // Get Whitelisted Input Values

  let addAddress = useRef();
  let removeAddress = useRef();
  let checkAddress = useRef();
  // Whitlisting Functions
  const addToWhiteList = async () => {
    console.log(addAddress.current.value);
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );

      await cyberShareContract.whitelistUser(addAddress.current.value);
    } else {
      connect();
    }
  };
  const removeFromWhiteList = async () => {
    console.log(removeAddress.current.value);
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );

      await cyberShareContract.removeWhitelistUser(removeAddress.current.value);
    } else {
      connect();
    }
  };
  const checkIsWhiteListed = async () => {
    console.log(checkAddress.current.value);
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );

      let res = await cyberShareContract.whitelisted(
        checkAddress.current.value
      );
      alert(res);
    } else {
      connect();
    }
  };

  // Message After Trasaction
  // const Msg = ({ closeToast, toastProps, hash }) => (
  //   <div className="">
  //     Token ${totalSupply + 1} Minted to {account} <br /> Block URI:
  //     <a
  //       className="text-underline text-blue-900"
  //       href={`https://rinkeby.etherscan.io/tx/${hash}`}
  //       target="_blank"
  //     >
  //       https://mumbai.polygonscan.com/tx/${hash}
  //     </a>
  //     {/* <button>Retry</button> */}
  //     {/* <button onClick={closeToast}>Close</button> */}
  //   </div>
  // );
  const Msg = ({ closeToast, toastProps, hash }) => (
    <div className="">
      Token ${totalSupply + 1} Minted to {account} <br /> Block URI:
      <a
        className="text-underline text-blue-900"
        href={`https://rinkeby.etherscan.io/tx/${hash}`}
        target="_blank"
      >
        https://rinkeby.etherscan.io/tx/${hash}
      </a>
      {/* <button>Retry</button> */}
      {/* <button onClick={closeToast}>Close</button> */}
    </div>
  );
  // Error Message
  const ErrorMsg = ({ closeToast, toastProps, e }) => (
    <div className="mx-auto text-blue-900">
      {/* Token Minted to ${account} <br /> Block URI: */}
      {e}
      {/* <button>Retry</button> */}
      {/* <button onClick={closeToast}>Close</button> */}
    </div>
  );

  // const displayMsg = () => {
  //   toast(<Msg />)
  //   // toast(Msg) would also work
  // }
  const notify = (hash) =>
    toast(
      <Msg hash={hash} />,

      {
        position: "top-center",

        autoClose: 5000,
        hideProgressBar: false,
        // closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  // Notify Error
  const notifyError = (e) =>
    toast(
      <ErrorMsg e={e} />,

      {
        position: "top-center",

        autoClose: 5000,
        hideProgressBar: false,
        // closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  // toast.info(

  //   `Token ${count}Transfer From 0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa to ${account} Block URI: <a href="https://mumbai.polygonscan.com/tx/${hash}">https://mumbai.polygonscan.com/tx/${hash}</a> `,
  // {
  //   position: "top-center",

  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   // closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // }
  // );
  const [account, setAccount] = useState("");
  // const [account1, setAccount1] = useState("");
  // const [block, setBlock] = useState();
  const [show, setShow] = useState(true);
  // Polygon
  // const cyberShareContractAddress =
  //   "0xf6b68096b4fBcBBD846D44B54Fc96406A9a758c7";

  // Rinkiby
  const cyberShareContractAddress =
    "0xdF6110841d03EA58de3C89E0a29a16B23b0c7d00";
  // const cyberShareContractAddress =
  //   "0x9327280C1a8df4841d33Dd36D2278022357A538d";
  const connect = async () => {
    if (window.ethereum) {
      // alert("detected");
      setHasMetaMask(true);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length) {
          setIsConnected(true);
          setAccount(accounts[0]);
          // console.log(accounts);
        }
      } catch (e) {
        alert("Error Connecting...");
      }
    } else {
      console.log("install Metamast extension to continue");
      setHasMetaMask(false);
    }
  };
  console.log(isAdmin);

  useEffect(() => {
    async function a() {
      connect();
      if (window.ethereum) {
        setChainId(await window.ethereum.request({ method: "eth_chainId" }));

        //   alert("detected");
        // setHasMetaMask(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // if (window.ethereum.isConnected()) {
        //   setIsConnected(true);
        // }

        const cyberShareContract = new ethers.Contract(
          cyberShareContractAddress,
          cyberShareABI,
          provider.getSigner()
        );
        // await cyberShareContract.mint(
        //   "0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa",
        //   "10"
        // );
        let wallet = await provider.getSigner().getAddress();
        // let owner = "0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa";
        let owner1 = BigNumber.from(await cyberShareContract.owner());
        setOwner(owner1._hex);
        console.log(owner1._hex);
        if (wallet === owner1._hex) {
          setIsAdmin(true);
        }
        setMaxMint(
          BigNumber.from(await cyberShareContract.maxMint()).toNumber()
        );
        setTotalSupply(
          BigNumber.from(await cyberShareContract.totalSupply()).toNumber()
        );
        // setAccount1(BigNumber.from(await cyberShareContract.ownerOf(count)));
        setIsPreSale(await cyberShareContract.preSale());
        setIsRevealed(await cyberShareContract.reveal());
        // console.log(await cyberShareContract.owner);
        // console.log(typeof count);
        // console.log(account1._hex);
      } else {
        console.log("install Metamast extension to continue");
        setHasMetaMask(false);
      }
    }
    a();
  }, [chainId, account]);
  if (window.ethereum) {
    // setHasMetaMask(true);
    window.ethereum.on("chainChanged", (chainId) => {
      setChainId(chainId);
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      // If user has locked/logout fromMMetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        setAccount("");
        setIsAdmin(false);
        setIsConnected(false);
        // logic to handle what happens once MetaMask is locked
      } else {
        if (accounts[0] == owner) {
          setIsAdmin(true);

          setAccount(accounts[0]);
        } else if (account[0] != owner) {
          setIsAdmin(false);
          setAccount(accounts[0]);
        }
      }
    });
  }
  // if (window.ethereum) {
  //   // setHasMetaMask(true);
  //   window.ethereum.on("message", (message) => {
  //     setCount(count + 1);
  //   });
  // }

  // console.log(count);

  // let countarr = [0];
  // console.log(count);
  // console.log(count);
  // useEffect(() => {
  //   return () => {
  //     console.log(block);
  //   };
  // }, [block]);

  const transferNFT = async (cyberShareContract) => {
    // setCount(BigNumber.from(await cyberShareContract.count()).toNumber());
    // setAccount1(BigNumber.from(await cyberShareContract.ownerOf(count)));
    // var arr = [account];
    // console.log(account1._hex);
    // if (account1._hex == "0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa") {
    // have  to cahnge to Contract owner Address
    // let countrrr = [count];
    const checkIsPreSale = await cyberShareContract.preSale();
    let options;
    let c;
    if (!isAdmin) {
      if (checkIsPreSale) {
        options = { value: await cyberShareContract.preSaleCost() };
        let check = await cyberShareContract.whitelisted(account);
        console.log(check);
        if (!check) {
          notifyError("Account not Whitelisted");
          return;
        }
      } else {
        options = { value: await cyberShareContract.cost() };
      }
      try {
        c = await cyberShareContract.mint(1, options);
        setTotalSupply(totalSupply + 1);
      } catch (e) {
        notifyError(e.message.split(" ").slice(0, 5).join(" "));
        // console.log("Error:", e.message.split(" ").slice(0, 10).join(" "));
        // alert(e.message);
      }
    } else {
      try {
        c = await cyberShareContract.mint(1);
        setTotalSupply(totalSupply + 1);
      } catch (e) {
        notifyError(e.message.split(" ").slice(0, 5).join(" "));
        // console.log("Error:", e.message.split(" ").slice(0, 10).join(" "));
        // alert(e.message);
      }
    }
    // setTotalSupply(totalSupply + 1);
    console.log("trns", c);

    // alert(
    //   `Token ${count}Transfer From 0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa to ${account} Block URI: https://mumbai.polygonscan.com/tx/${c.hash} `
    // );
    if (c != undefined) notify(c.hash);

    // }
    // setCount(count + 1);
    // } else {
    //   // setCount(count + 1);
    //   // console.log(countarr[0]);
    //   await cyberShareContract.setCount(count + 1);
    //   await transferNFT(cyberShareContract);
    // }
  };
  const transaction = async () => {
    console.log("in");
    // console.log(count);
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );

      await transferNFT(cyberShareContract);
    } else {
      connect();
    }
  };

  const reveal = async () => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );
      try {
        await cyberShareContract.toggleReveal();
        setIsRevealed(!isRevealed);
      } catch (e) {
        notifyError(e.message.split(" ").slice(0, 5).join(" "));
        // console.log("Error:", e.message.split(" ").slice(0, 10).join(" "));
        // alert(e.message);
      }
    } else {
      connect();
    }
  };
  const preSale = async () => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      const cyberShareContract = new ethers.Contract(
        cyberShareContractAddress,
        cyberShareABI,
        provider.getSigner()
      );
      try {
        await cyberShareContract.togglePresale();
        setIsPreSale(!isPreSale);
      } catch (e) {
        notifyError(e.message.split(" ").slice(0, 5).join(" "));
        // console.log("Error:", e.message.split(" ").slice(0, 10).join(" "));
        // alert(e.message);
      }
    } else {
      connect();
    }
  };
  return (
    <div className="app bg-black py-4  px-8 h-full md:max-h-[100vh] w-[100%]">
      <ToastContainer />

      {/* Dialog add Whitlist */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add to Whitelist
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    ref={addAddress}
                    type="text"
                    className="border-2 border-black px-4 py-2 w-full rounded-2xl "
                    placeholder="Address"
                  />
                </div>

                <div className="mt-4 ">
                  <button
                    type="button"
                    className=" button ml-[70%] inline-flex justify-center px-8 py-2 text-sm font-medium hover:border-white hover:border-2 bg-black text-white cursor-pointer border border-transparent rounded-2xl   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={addToWhiteList}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Dialog ENd */}
      {/* Dialog Remove Whitlist */}
      <Transition appear show={isOpen1} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal1}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Remove From Whitelist
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    ref={removeAddress}
                    type="text"
                    className="border-2 border-black px-4 py-2 w-full rounded-2xl "
                    placeholder="Address"
                  />
                </div>

                <div className="mt-4 ">
                  <button
                    type="button"
                    className=" button ml-[60%] sm:ml-[70%] inline-flex justify-center px-8 py-2 text-sm font-medium hover:border-white hover:border-2 bg-black text-white cursor-pointer border border-transparent rounded-2xl   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={removeFromWhiteList}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Dialog ENd */}
      {/* Dialog Remove Whitlist */}
      <Transition appear show={isOpen2} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal2}
        >
          <div className="min-h-screen w-[90%] mx-auto  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Is Whitelisted
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    ref={checkAddress}
                    type="text"
                    className="border-2 border-black px-4 py-2 w-full rounded-2xl "
                    placeholder="Address"
                  />
                </div>

                <div className="mt-4 ">
                  <button
                    type="button"
                    className=" button ml-[70%] inline-flex justify-center px-8 py-2 text-sm font-medium hover:border-white hover:border-2 bg-black text-white cursor-pointer border border-transparent rounded-2xl   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={checkIsWhiteListed}
                  >
                    Check
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Dialog ENd */}

      <div
        className={` nav transition duration-300 ease-in-out  py-3 fixed w-full ${
          !show && "hidden"
        } `}
      >
        <div className="flex md:justify-between   md:w-[90%]  lg:w-[80%] mx-auto text-white items-center tracking-wide text-[0.7rem] md:text-[0.6rem] lg:text-base ">
          <div className="flex items-center font-bold tracking-wider   text-center sm:mx-0 sm:text-left">
            {/* THE SINNERS <br />
        <span className="font-normal tracking-wide mx-auto">Club</span> */}

            <img
              src="./imgs/logo.png"
              className="h-[70px] pt-2 w-[80px] hidden sm:block "
              alt=""
            />
            <div className="text-sm italic">MONARCH APE SOCIETY</div>
          </div>
          <div className="  active:text-xl md:text-xs lg:text-lg active:text-rose-200 cursor-pointer hidden ml-auto md:inline-block hover:text-[#0291BE]  mr-6">
            HOME
          </div>
          <div className="sm:hidden ml-auto"></div>
          {isAdmin ? (
            <div
              className=" hidden md:inline-block button min-w-[100px]  rounded-2xl py-2 mr-4 px-4 hover:border-white hover:border-2 bg-black text-white cursor-pointer"
              onClick={isAdmin ? reveal : null}
            >
              REVEAL {isRevealed ? "(ON)" : "(OFF)"}
              {/* {count}/{totalSupply} */}
            </div>
          ) : null}
          {isAdmin ? (
            <div
              className=" hidden md:inline-block button min-w-[100px]  rounded-2xl py-2 mr-4 px-4 hover:border-white hover:border-2 bg-black text-white cursor-pointer"
              onClick={isAdmin ? preSale : null}
            >
              PRESALE {isPreSale ? "(ON)" : "(OFF)"}
              {/* {count}/{totalSupply} */}
            </div>
          ) : null}
          {!isAdmin ? (
            <div
              className="hidden md:inline-block  button  rounded-2xl py-2 mr-4 px-4 hover:border-white hover:border-2 bg-black text-white cursor-pointer"
              onClick={!isAdmin ? openModal2 : null}
            >
              IS WHITELISTED
              {/* {count}/{totalSupply} */}
            </div>
          ) : null}
          <div className="ml-auto lg:hidden"></div>
          {isAdmin ? (
            <Menu as="div" className="relative inline-block text-left ">
              <div>
                <Menu.Button className="button mr-6 inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-white bg-black rounded-2xl  hover:border-white hover:border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  WHITELIST
                  {/* <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    /> */}
                </Menu.Button>
              </div>

              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openModal}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Add to Whitelist
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openModal1}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Remove From Whitelist
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openModal2}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Is WhiteListed
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : // </div>
          null}

          {/* Mobile DropDown */}

          <Menu as="div" className="md:hidden relative inline-block text-left">
            <div>
              <Menu.Button className="mr-16 button rounded-[100%]  inline-flex justify-center  p-3  text-sm font-medium text-white   border-white border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <BiDownArrow />
                {/* <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    /> */}
              </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      // onClick={openModal}
                      className={`${
                        active ? "bg-black text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Home
                    </button>
                  )}
                </Menu.Item>
                {isAdmin ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={isAdmin ? reveal : null}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Reveal {isRevealed ? "(ON)" : "(OFF)"}
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {isAdmin ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={isAdmin ? preSale : null}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        PreSale {isPreSale ? "(ON)" : "(OFF)"}
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                {!isAdmin ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openModal2}
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Is WhiteListed
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={isConnected ? null : connect}
                      className={`${
                        isConnected ? "bg-black text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {hasMetaMask ? (
                        isConnected ? (
                          "Connected"
                        ) : (
                          "Connect"
                        )
                      ) : (
                        <a
                          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                          target="_blank"
                        >
                          Install MetaMask
                        </a>
                      )}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          {/* Mobile DropDown End */}
          <div
            className="hidden md:inline-block button ml-2 rounded-2xl py-2 mr-16 px-4 border-white border-2 bg-black text-white cursor-pointer"
            onClick={isConnected ? null : connect}
          >
            {hasMetaMask ? (
              isConnected ? (
                "Connected"
              ) : (
                "Connect"
              )
            ) : (
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                target="_blank"
              >
                Install MetaMask
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <img
          src="./imgs/NFTKing.png"
          className=" hidden sm:block w-[100%]   md:w-[60%] h-[80vh] min-h-[350px] min-w-[300px] mx-auto "
          alt=""
        />
        <img
          src="./imgs/NFTKing_mbl.png"
          className="mt-8 sm:hidden w-[100%]  h-[80vh] min-h-[350px] min-w-[250px] mx-auto "
          alt=""
        />
      </div>

      <div className=" w-[90%] md:w-[50%]  mx-auto lg:pl-28 lg:pr-28 ">
        {/* <img
            src="./imgs/main_logo.png"
            className=" mx-auto h-[60px] w-[100%] "
            alt=""
          /> */}
        {/* <div
            className={`text-center mx-auto text-2xl lg:text-3xl tracking-widest text-white pb-4 italic ${
              isConnected ? "hidden " : "block "
            }`}
          >
            <br /> Waiting for connection with Metamask <br /> Any Problems?
            Refresh the page & open Metamask{" "}
          </div> */}
        {/* {chainId != "0x13881" ? (
          <p className="text-red-800 p-4 text-center md:mt-[-50px]">
            Connect to polygon Testnet
          </p>
        ) : null} */}
        {chainId != "0x4" ? (
          <p className="text-red-800 p-4 text-center md:mt-[-50px]">
            Connect to Rinkiby Testnet
          </p>
        ) : null}
        <button
          className="button tracking-widest text-white px-12 py-4 border-2 w-[100%] font-bold italic "
          onClick={isConnected ? transaction : null}
        >
          {isConnected ? `Mint (   ${totalSupply}/${maxMint}) ` : "Waiting.."}
        </button>
      </div>
      <div className="footer text-white pb-[83px] md:pb-0 md:flex justify-between mt-28 md:mt-0 items-center ">
        <div className="left text-[0.5rem]  sm:font-normal md:font-bold sm:text-[0.6rem] w-[80%] max-w-[350px] sm:min-w-[340px] min-w-[200px] mx-auto lg:mx-0 lg:w-[40%]   font-lighter flex   justify-between items-center ">
          <h4 className="mr-1 sm:mr-0">TERMS & CONDITIONS</h4>
          <h4 className="mr-1 sm:mr-0">PRIVACY POLICY</h4>
          <h4 className="mr-1 sm:mr-0">2022 MONARCH APE SOCIETY</h4>
        </div>
        <div className="right flex w-[10%] justify-between min-w-[200px] mx-auto mt-5 lg:mt-0 lg:mr-0 ">
          <a href="https://discord.gg/JNfTxsHTD2" target={"_blank"}>
            <div className="icon bg-white rounded-full w-12 h-12 flex justify-center pt-3 hover:bg-gray-300 ">
              {" "}
              <FaDiscord color="black" size={"70%"} />{" "}
            </div>
          </a>
          {/* <a href="#" target={"_blank"}> */}
          <div className="icon bg-white rounded-full w-12 h-12 flex justify-center pt-3 hover:bg-gray-300 ">
            {" "}
            <FaTwitter color="black" size={"70%"} />{" "}
          </div>
          {/* </a> */}
          <a href="#" target={"_blank"}>
            <div className="icon bg-white rounded-full w-12 h-12 flex justify-center pt-3 hover:bg-gray-300 ">
              {" "}
              <FaInstagram color="black" size={"70%"} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
