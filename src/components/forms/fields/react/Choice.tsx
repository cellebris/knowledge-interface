"use client"

import * as React from "react"
import * as RadioCards from "@radix-ui/react-radio-group"

import { cn } from '~/utils/misc';

const Choice = RadioCards.Root

const ChoiceOption = React.forwardRef<
  React.ComponentRef<typeof RadioCards.Item>,
  React.ComponentPropsWithoutRef<typeof RadioCards.Item>
>(({ className, ...props }, ref) => (
  <RadioCards.Item
    ref={ref}
    className={cn(
      "mx-1 my-2 p-2 rounded-lg flex-col text-center",
      className
    )}
    {...props}
  />
))
ChoiceOption.displayName = RadioCards.Item.displayName

export { Choice, ChoiceOption }
