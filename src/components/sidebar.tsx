import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GameList from "./game-list";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon color="hsl(120 100% 25%)" width={46} height={60} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>List of Games</SheetTitle>
          <SheetDescription>
            <GameList />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
