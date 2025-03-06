import { NumberField } from "@base-ui-components/react";
import MiniMinusIcon from "./icons/MiniMinusIcon";
import MiniPlusIcon from "./icons/MiniPlusIcon";
import { useId } from "react";

export default function CustomNumberField({
  min,
  max,
  onValueChanged,
}: {
  min: number;
  max: number;
  onValueChanged: (value: number | null, event?: Event) => void;
}) {
  const id = useId();
  return (
    <NumberField.Root
      id={id}
      defaultValue={5}
      className="flex flex-col items-start gap-1"
      min={min}
      max={max}
      onValueChange={onValueChanged}
    >
      <NumberField.Group className="flex">
        <NumberField.Decrement className="flex size-8 items-center justify-center rounded-tl-md rounded-bl-md border border-zinc-800 bg-clip-padding select-none hover:border-zinc-700 active:bg-zinc-800">
          <MiniMinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className="h-8 w-12 border-t border-b border-zinc-800 text-center text-sm tabular-nums focus:z-1 focus:outline focus:-outline-offset-1 focus:outline-zinc-700" />
        <NumberField.Increment className="flex size-8 items-center justify-center rounded-tr-md rounded-br-md border border-zinc-800 bg-clip-padding select-none hover:border-zinc-700 active:bg-zinc-800">
          <MiniPlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
