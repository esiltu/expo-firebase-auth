import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => (
    <Drawer>
        <Drawer.Screen
            name="(tabs)"
            options={{
                headerTitle: 'Tabs',
                drawerLabel: 'Tabs',
                drawerIcon: ({ size, color }) => (
                    <MaterialIcons name="border-bottom" size={size} color={color} />
                ),
                headerRight: () => (
                    <Link href="/modal" asChild>
                        <HeaderButton />
                    </Link>
                ),
            }}
        />
    </Drawer>
);

export default DrawerLayout;
