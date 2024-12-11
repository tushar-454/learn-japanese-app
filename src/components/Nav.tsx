import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

interface NavProps {
  isMobile: boolean;
}

const Nav = ({ isMobile }: NavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className={isMobile ? 'flex flex-col bg-none' : ''}>
        <NavigationMenuItem>
          <Link to='/lessons'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Lessons
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to='/tutorials'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Tutorials
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Nav;
