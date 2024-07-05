/*
** Why do we use React.forwardRef?
   - React.forwardRef is a higher-order component (HOC) provided by
     React that allows components to receive and pass along refs. It's
     particularly useful when you need to ***---access the underlying DOM
     element of a child component from a parent component---*** or when you
     want to pass a ref down to a child component that you don't control. 

- React.ElementRef<'a'>:
        - This specifies the type of the forwarded ref.
          In this case, it indicates that the ref should refer to an element
          of type 'a', typically an <a> (anchor) element in HTML.

        - The ref parameter is of type React.ElementRef<"a">, which is a
          generic type provided by React. This type represents the type of
          the DOM element that the ref will be attached to. In this case,
          it indicates that the ref can be attached to an <a> element.

        - By using React.ElementRef<"a">, the forwardRef function ensures
          that the ref passed to the component is compatible with <a> elements.

- React.ComponentPropsWithoutRef<'a'>:
        - This specifies the type of props that the component accepts.
          It indicates that the component accepts all props that can be
          passed to an <a> element, except for the ref prop,
          which is handled separately by forwardRef.
*/

import React from "react";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}
        >
          <div className="text-white text-sm font-medium leading-none">
            {title}
          </div>
          <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug text-white/40">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;
