import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const TravelCostInput = ({ value, setValue }) => {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      min={0}
      data-testid="input_value"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper data-testid="increment" />
        <NumberDecrementStepper data-testid="decrement" />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default TravelCostInput;
