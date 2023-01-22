import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

function AlertModal({ dexA, dexB }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>ARBITRAR</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {success === false ? (
            <ModalHeader>Vas a arbitrar</ModalHeader>
          ) : (
            <ModalHeader>¡Felicidades!</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            {success === false ? (
              <Text fontWeight="bold" mb="1rem">
                Obtendrás una ganancia de {Math.abs((dexA-dexB)) / 1000000} USDC
              </Text>
            ) : (
              <Text fontWeight="bold" mb="1rem">
                Obtuviste una ganancia de {Math.abs((dexA-dexB)) / 1000000} USDC
              </Text>
            )}
            <Text count={2} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            {success === false ? (
              <Button onClick={() => setSuccess(true)} colorScheme="orange">
                Arbitrar
              </Button>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AlertModal;
