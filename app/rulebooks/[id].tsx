import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  YStack,
  XStack,
  SizableText,
  Button,
  ScrollView,
  Input,
} from 'tamagui';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { useState } from 'react';

const TABS = ['Sources', 'Chat', 'Config'] as const;

const sampleSources = [
  { id: '1', title: 'GAH_rules_EN_web.pdf' },
  { id: '2', title: 'en_gah_letswaltz_crowdfunding.html…' },
];

export default function RulebookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<(typeof TABS)[number]>('Chat');
  const [modal, setModal] = useState(false);

  return (
    <YStack flex={1} backgroundColor="#111827" paddingTop={insets.top}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <XStack alignItems="center" px="$3" py="$2" gap="$3">
        <Link href="/" asChild>
          <Button
            size="$3"
            borderRadius={999}
            backgroundColor="transparent"
            pressStyle={{ backgroundColor: '#1F2937' }}
          >
            <Ionicons name="arrow-back" size={24} color="#F9FAFB" />
          </Button>
        </Link>
        <SizableText size="$5" fontWeight="600" color="#F9FAFB" flex={1}>
          {id}
        </SizableText>
        <Button
          size="$3"
          borderRadius={999}
          backgroundColor="transparent"
          pressStyle={{ backgroundColor: '#1F2937' }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#F9FAFB" />
        </Button>
      </XStack>

      <ScrollView flex={1} px="$3">
        {/* Emoji + Title section */}
        <YStack gap="$2" mb="$4">
          <SizableText size="$10">🏨</SizableText>
          <SizableText size="$7" fontWeight="700" color="#F9FAFB">
            {id}
          </SizableText>
          <SizableText color="#9CA3AF">2 sources</SizableText>
        </YStack>

        {tab === 'Chat' && (
          <SizableText lineHeight={20} color="#F9FAFB">
            {/* Placeholder summary text */}
            The provided texts offer comprehensive insights into the {id} board game and its
            expansion.
          </SizableText>
        )}

        {tab === 'Sources' && (
          <YStack gap="$3">
            {sampleSources.map((src) => (
              <XStack key={src.id} alignItems="center" gap="$3">
                <Ionicons name="document" size={24} color="#EF4444" />
                <SizableText color="#F9FAFB">{src.title}</SizableText>
              </XStack>
            ))}
            <Button
              mt="$4"
              borderColor="#4F46E5"
              borderWidth={1}
              backgroundColor="transparent"
              onPress={() => setModal(true)}
            >
              <SizableText color="#4F46E5">+ Add a source</SizableText>
            </Button>
          </YStack>
        )}

        {tab === 'Config' && (
          <SizableText color="#F9FAFB">Config content coming soon…</SizableText>
        )}
      </ScrollView>

      {/* Chat input fixed above tab bar when Chat tab active */}
      {tab === 'Chat' && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 64 : 0}
        >
          <XStack
            alignSelf="center"
            alignItems="center"
            gap="$2"
            backgroundColor="#1F2937"
            borderRadius={12}
            paddingHorizontal="$3"
            paddingVertical="$2"
            width="90%"
          >
            <Input
              flex={1}
              placeholder="Ask 2 sources…"
              backgroundColor="transparent"
              color="#F9FAFB"
              placeholderTextColor="#6B7280"
            />
            <Button size="$2" circular backgroundColor="#4F46E5" pressStyle={{ backgroundColor: '#4338CA' }}>
              <Ionicons name="send" size={16} color="#FFFFFF" />
            </Button>
          </XStack>
        </KeyboardAvoidingView>
      )}

      {/* Bottom Tab Bar */}
      <XStack gap="$6" justifyContent="center" py="$3" borderTopColor="#1F2937" borderTopWidth={1}>
        {TABS.map((t) => (
          <Button
            key={t}
            backgroundColor="transparent"
            pressStyle={{ backgroundColor: '#1F2937' }}
            onPress={() => setTab(t)}
          >
            <SizableText color={tab === t ? '#F9FAFB' : '#6B7280'}>{t}</SizableText>
          </Button>
        ))}
      </XStack>

      {/* Add Source Modal */}
      {modal && (
        <YStack
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          backgroundColor="#00000088"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
        >
          <YStack width="90%" maxWidth={400} backgroundColor="#111827" borderRadius={12} p="$5" gap="$4">
            <YStack alignItems="center" gap="$3">
              <YStack
                width={64}
                height={64}
                borderRadius={32}
                backgroundColor="#4F46E5"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="document" size={28} color="#FFFFFF" />
              </YStack>
              <SizableText fontWeight="600" size="$6" color="#F9FAFB" textAlign="center">
                Add Source
              </SizableText>
            </YStack>
            <Button
              alignSelf="flex-end"
              backgroundColor="transparent"
              pressStyle={{ backgroundColor: '#1F2937' }}
              position="absolute"
              top={12}
              right={12}
              onPress={() => setModal(false)}
            >
              <Ionicons name="close" size={24} color="#F9FAFB" />
            </Button>
            <SizableText color="#9CA3AF" textAlign="center">
              Sources let Rulebooks base its responses on the information that matters most to you.
            </SizableText>
            {['PDF', 'BGG ID', 'Ludopedia ID', 'Website', 'Local'].map((opt) => (
              <Button
                key={opt}
                backgroundColor="#1F2937"
                pressStyle={{ backgroundColor: '#374151' }}
                borderRadius={8}
                onPress={() => {
                  setModal(false);
                }}
              >
                {opt}
              </Button>
            ))}
          </YStack>
        </YStack>
      )}
    </YStack>
  );
} 