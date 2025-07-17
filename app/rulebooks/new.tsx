import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Button, Input, YStack, SizableText } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewRulebook() {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');

  return (
    <YStack flex={1} backgroundColor="#111827" paddingTop={insets.top} px="$4" gap="$4">
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Create Rulebook',
          headerStyle: { backgroundColor: '#111827' },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: { color: '#F9FAFB' },
        }}
      />

      <SizableText size="$6" fontWeight="600" color="#F9FAFB">
        Rulebook title
      </SizableText>
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Enter name"
        backgroundColor="#1F2937"
        color="#F9FAFB"
        borderRadius={8}
        padding={12}
      />

      <Button
        backgroundColor="#4F46E5"
        pressStyle={{ backgroundColor: '#4338CA' }}
        borderRadius={8}
        onPress={() => {
          // For now just navigate back
          router.back();
        }}
      >
        Save
      </Button>
    </YStack>
  );
} 