import {
  Container,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";

export default function CallToActionWithIllustration() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Criptoarbitraje,{" "}
          <Text as={"span"} color={"orange.400"}>
            sencillo y rápido.
          </Text>
        </Heading>
        <Heading as='h5' size='sm'>
          Nunca pierdas una oportunidad. Nunca llegues tarde a tu arbitraje.
        </Heading>
      </Stack>
    </Container>
  );
}
