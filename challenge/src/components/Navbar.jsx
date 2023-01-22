import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  useColorMode,
  TagLabel,
  TagCloseButton,
  Badge,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";
import useTruncatedAddress from "../hooks/useTruncatedAddress";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  //Metamask connection
  const [balance, setBalance] = useState(0);
  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  //Goerli Testnet accepted. Other testnet/mainnet are not supported.
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  //Connect Metamask
  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  //Disconnect Metamask
  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  //Obtain account balance
  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  //Hook to truncate address to show it more user-friendly
  const truncatedAddress = useTruncatedAddress(account);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"flex-end"}>
          {active ? (
            <Tag colorScheme="orange" borderRadius="full">
              <TagLabel>
                <Text>{truncatedAddress}</Text>
              </TagLabel>
              <Badge
                d={{
                  base: "none",
                  md: "block",
                }}
                variant="solid"
                fontSize="0.8rem"
                ml={1}
              >
                ~{balance} Ξ
              </Badge>
              <TagCloseButton onClick={disconnect} />
            </Tag>
          ) : (
            <Button
              variant={"solid"}
              colorScheme={"orange"}
              size={"sm"}
              onClick={connect}
              disabled={isUnsupportedChain}
            >
              {isUnsupportedChain ? "Red no soportada" : "Conectar wallet"}
            </Button>
          )}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
