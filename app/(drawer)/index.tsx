import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YStack, XStack, SizableText, Button } from 'tamagui';
import { Pressable } from 'react-native';
// Removed padding Container to allow full-width background
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = ['Recent', 'Rulebooks', 'Downloaded'] as const;

const items = [
  { id: '1', title: 'Grand Austria Hotel', sources: 2, updated: '22 hours ago', action: 'edit' },
  { id: '2', title: 'Parks Game: Rulebook and Trail…', sources: 1, updated: 'July 12, 2025', action: 'play' },
  {
    id: '3',
    title: 'CATsle Builders: Official Rulebook…',
    sources: 1,
    updated: 'July 12, 2025',
    action: 'edit',
  },
  { id: '4', title: 'Age of Steam: Game Rules and…', sources: 1, updated: 'July 5, 2025', action: 'edit' },
  {
    id: '5',
    title: 'Planet Unknown Official Rulebook…',
    sources: 1,
    updated: 'June 23, 2025',
    action: 'play',
  },
  {
    id: '6',
    title: 'Twilight Imperium: Crónica da…',
    sources: 2,
    updated: 'June 28, 2025',
    action: 'play',
  },
  { id: '7', title: 'Village Rails: Rulebook for…', sources: 1, updated: 'June 28, 2025', action: 'edit' },
  { id: '8', title: 'Wander…', sources: 1, updated: 'June 23, 2025', action: 'play' },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>('Recent');
  const insets = useSafeAreaInsets();

  const renderTab = (tab: (typeof tabs)[number]) => (
    <Button
      key={tab}
      size="$3"
      backgroundColor={tab === selectedTab ? '#FFFFFF22' : 'transparent'}
      borderRadius={20}
      pressStyle={{ backgroundColor: '#FFFFFF33' }}
      onPress={() => setSelectedTab(tab)}
    >
      <SizableText fontWeight="600" color={tab === selectedTab ? '#FFFFFF' : '#9CA3AF'}>
        {tab}
      </SizableText>
    </Button>
  );

  const renderItem = ({ item }: { item: (typeof items)[number] }) => (
    <Pressable
      onPress={() => router.push(`/rulebooks/${encodeURIComponent(item.title)}`)}
      style={({ pressed }) => ({
        width: '100%',
        paddingVertical: 12,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <XStack alignItems="center" justifyContent="space-between" gap="$2" width="100%">
        <XStack alignItems="center" gap="$3">
          <Ionicons name="document-text-outline" size={24} color="#9CA3AF" />
          <YStack flex={1}>
            <SizableText fontWeight="600" size="$4" color="#F9FAFB" flexShrink={1}>
              {item.title}
            </SizableText>
            <SizableText size="$2" color="#9CA3AF" flexShrink={1}>
              {item.sources} {item.sources === 1 ? 'source' : 'sources'} · {item.updated}
            </SizableText>
          </YStack>
        </XStack>
        <Ionicons name="play-circle-outline" size={24} color="#9CA3AF" />
      </XStack>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <YStack
        flex={1}
        gap="$4"
        backgroundColor="#111827"
        paddingTop={insets.top}
        paddingHorizontal="$3"
      >
        <XStack alignItems="center" justifyContent="space-between">
          <SizableText size="$7" fontWeight="700" color="#F9FAFB">
            Rulebooks
          </SizableText>
          <Ionicons name="person-circle" size={32} color="#F9FAFB" />
        </XStack>

        <XStack gap="$2">{tabs.map(renderTab)}</XStack>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        />

        <Button
          position="absolute"
          bottom={insets.bottom + 20}
          alignSelf="center"
          size="$5"
          borderRadius={9999}
          backgroundColor="#4F46E5"
          pressStyle={{ backgroundColor: '#4338CA' }}
          onPress={() => router.push('/rulebooks/new')}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </Button>
      </YStack>
    </>
  );
}
