"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

export type ComboBoxItemType = {
  value: string;
  label: string;
};

type ComboboxProps = {
  value?: string;
  onSelect: (value: string) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  onSearchChange?: (e: string) => void;
};

const popOverStyles = {
  width: "var(--radix-popover-trigger-width)",
};

export function SearchCombobox({
  value,
  onSelect,
  items,
  searchPlaceholder = "Pesquisar item...",
  noResultsMsg = "Nenhum item encontrado",
  selectItemMsg = "Selecione um item",
  className,
  unselect = false,
  unselectMsg = "Nenhum",
  onSearchChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleOnSearchChange = useDebouncedCallback((e: string) => {
    if (e === "") {
      return;
    }

    if (onSearchChange) {
      console.log("handleOnSearchChange e:", e);
      onSearchChange(e);
    }
  }, 300);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : selectItemMsg}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={popOverStyles}
        className="popover-content-width-same-as-its-trigger p-0"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleOnSearchChange}
          />
          <div className="max-h-[220px] overflow-auto">
            <CommandEmpty>{noResultsMsg}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {unselect && (
                  <CommandItem
                    key="unselect"
                    value=""
                    onSelect={() => {
                      onSelect("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === "" ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {unselectMsg}
                  </CommandItem>
                )}
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={(currentValue) => {
                      onSelect(item.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
