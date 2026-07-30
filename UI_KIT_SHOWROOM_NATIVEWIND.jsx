import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

/**
 * ============================================================================
 * REACT NATIVE & NATIVEWIND (TAILWIND CSS) MASTER UI KIT SHOWROOM
 * ============================================================================
 * File ini berisi kumpulan komponen UI Mobile React Native menggunakan NativeWind 
 * (Syntax Tailwind CSS v3/v4 via className="..."):
 * 
 * 1. Top Bar Navigation & Notification Header
 * 2. Facebook & Instagram Style Mobile Profile Dashboard
 * 3. Primary, Secondary, Outline, Danger & Disabled Buttons
 * 4. Tokopedia Product Card, Stat Widget & User Row Cards
 * 5. Glassmorphism Auth Login & Register Form Inputs
 * 6. SaaS Pricing Tier Cards (Starter, Pro, Enterprise)
 * 7. Horizontal Category Filter Scroll Pills
 * 8. Off-Canvas Mobile Drawer Sidebar Menu (Modal)
 * 9. Fixed Bottom Navigation Tab Bar (Footer)
 * ============================================================================
 */

export default function NativeWindShowroom() {
  // State Interaktif untuk Demo UI Kit NativeWind
  const [activeTab, setActiveTab] = useState('posts');
  const [activeBottomNav, setActiveBottomNav] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'React Native', 'NativeWind', 'Tailwind', 'Mobile UI'];

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* =====================================================================
          1. HEADER / TOPBAR NAVIGATION (NATIVEWIND)
          ===================================================================== */}
      <View className="h-16 bg-slate-900 border-b border-slate-800 flex-row items-center justify-between px-4">
        {/* Mobile Drawer Menu Toggle */}
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
          onPress={() => setIsDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <Text className="text-sky-400 font-bold text-xl">☰</Text>
        </TouchableOpacity>

        {/* Title & Badge */}
        <View className="items-center">
          <Text className="text-[10px] font-bold text-emerald-400 tracking-widest">
            ⚡ NATIVEWIND TAILWIND UI
          </Text>
          <Text className="text-sm font-extrabold text-white">
            React Native Showroom
          </Text>
        </View>

        {/* Notification Bell */}
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-slate-800 items-center justify-center border border-slate-700 relative"
          onPress={() => Alert.alert('Notifikasi', 'Kamu memiliki 3 notifikasi baru!')}
          activeOpacity={0.7}
        >
          <Text className="text-lg">🔔</Text>
          <View className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full items-center justify-center">
            <Text className="text-white text-[9px] font-bold">3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-slate-950" showsVerticalScrollIndicator={false}>

        {/* =====================================================================
            2. FACEBOOK-STYLE PROFILE DASHBOARD (NATIVEWIND)
            ===================================================================== */}
        <View className="mt-6 px-4">
          <Text className="text-[10px] font-bold text-sky-400 tracking-widest uppercase mb-1">
            KATEGORI 1
          </Text>
          <Text className="text-xl font-extrabold text-white">
            Facebook Profile Dashboard
          </Text>
          <Text className="text-xs text-slate-400 mt-0.5 mb-4">
            Profile Cover, Overlapping Avatar, Metric Stats, Action Buttons & Post Feed.
          </Text>

          {/* Master Card Container */}
          <View className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            {/* Cover Banner */}
            <View className="h-36 bg-slate-800 relative">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' }}
                className="w-full h-full"
              />
              <TouchableOpacity
                className="absolute right-3 bottom-3 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700"
                activeOpacity={0.8}
              >
                <Text className="text-white text-[11px] font-bold">📷 Edit Cover</Text>
              </TouchableOpacity>
            </View>

            {/* Profile Content */}
            <View className="px-4 pb-4">
              {/* Overlapping Avatar */}
              <View className="-mt-12 mb-3 self-start relative">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                  className="w-24 h-24 rounded-full border-4 border-slate-900"
                />
                <TouchableOpacity className="absolute right-0 bottom-1 bg-sky-600 w-7 h-7 rounded-full items-center justify-center border-2 border-slate-900">
                  <Text className="text-xs">📷</Text>
                </TouchableOpacity>
              </View>

              {/* User Identity Info */}
              <View className="mb-4">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-2xl font-bold text-white">Reyhan Hamdani</Text>
                  <View className="bg-sky-600 w-4 h-4 rounded-full items-center justify-center">
                    <Text className="text-white text-[9px] font-bold">✓</Text>
                  </View>
                </View>
                <Text className="text-xs font-semibold text-sky-400 mt-0.5">
                  @reyhan.dev • Full Stack Mobile Engineer
                </Text>
                <Text className="text-xs text-slate-300 mt-2 leading-5">
                  🚀 Building scalable React Native & NativeWind apps. Focused on Clean Code & Modern Mobile UI/UX!
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2 mb-5">
                <TouchableOpacity className="flex-1 bg-sky-600 py-2.5 rounded-xl items-center shadow-lg shadow-sky-600/20">
                  <Text className="text-white text-xs font-bold">+ Add to Story</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-slate-800 py-2.5 rounded-xl items-center border border-slate-700">
                  <Text className="text-white text-xs font-bold">✏️ Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-11 bg-slate-800 rounded-xl items-center justify-center border border-slate-700">
                  <Text className="text-white text-sm">•••</Text>
                </TouchableOpacity>
              </View>

              {/* Profile Metric Stats */}
              <View className="flex-row bg-slate-950/80 rounded-2xl py-3 justify-around items-center mb-5 border border-slate-800">
                <View className="items-center">
                  <Text className="text-base font-extrabold text-white">142</Text>
                  <Text className="text-[11px] text-slate-400 mt-0.5">Posts</Text>
                </View>
                <View className="w-px h-6 bg-slate-800" />
                <View className="items-center">
                  <Text className="text-base font-extrabold text-white">4.8k</Text>
                  <Text className="text-[11px] text-slate-400 mt-0.5">Followers</Text>
                </View>
                <View className="w-px h-6 bg-slate-800" />
                <View className="items-center">
                  <Text className="text-base font-extrabold text-white">320</Text>
                  <Text className="text-[11px] text-slate-400 mt-0.5">Following</Text>
                </View>
              </View>

              {/* Profile Navigation Tabs */}
              <View className="flex-row border-b border-slate-800 mb-4">
                {['posts', 'photos', 'reels', 'about'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    className={`flex-1 py-3 items-center ${activeTab === tab ? 'border-b-2 border-sky-500' : ''}`}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      className={`text-xs font-bold uppercase ${
                        activeTab === tab ? 'text-sky-400' : 'text-slate-500'
                      }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Feed Post Item */}
              <View className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <View className="flex-row items-center mb-2.5">
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                    className="w-9 h-9 rounded-full"
                  />
                  <View className="ml-2.5 flex-1">
                    <Text className="text-xs font-bold text-white">Reyhan Hamdani</Text>
                    <Text className="text-[10px] text-slate-400 mt-0.5">2 jam lalu • 🌐 Public</Text>
                  </View>
                  <Text className="text-slate-400 text-sm">•••</Text>
                </View>

                <Text className="text-xs text-slate-200 leading-5 mb-2.5">
                  NativeWind UI Kit v1.0 resmi rilis! Syntax Tailwind CSS murni untuk komponen mobile React Native. 🚀✨
                </Text>

                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' }}
                  className="w-full h-44 rounded-xl mb-2.5"
                />

                {/* Like & Interaction Bar */}
                <View className="flex-row justify-between py-2 border-b border-slate-800">
                  <Text className="text-[11px] text-slate-400">👍 ❤️ {likeCount} Menyukai</Text>
                  <Text className="text-[11px] text-slate-400">18 Komentar • 5 Bagikan</Text>
                </View>

                <View className="flex-row pt-2">
                  <TouchableOpacity className="flex-1 items-center py-1.5" onPress={toggleLike}>
                    <Text className={`text-xs font-semibold ${isLiked ? 'text-rose-500' : 'text-slate-400'}`}>
                      {isLiked ? '❤️ Liked' : '🤍 Like'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 items-center py-1.5">
                    <Text className="text-xs font-semibold text-slate-400">💬 Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 items-center py-1.5">
                    <Text className="text-xs font-semibold text-slate-400">↗️ Share</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* =====================================================================
            3. BUTTONS & ACTIONS COLLECTION (NATIVEWIND)
            ===================================================================== */}
        <View className="mt-8 px-4">
          <Text className="text-[10px] font-bold text-sky-400 tracking-widest uppercase mb-1">
            KATEGORI 2
          </Text>
          <Text className="text-xl font-extrabold text-white">
            Buttons Collection (NativeWind)
          </Text>
          <Text className="text-xs text-slate-400 mt-0.5 mb-4">
            Primary, Secondary, Ghost, Danger, & Disabled Button Styles.
          </Text>

          <View className="bg-slate-900 rounded-3xl border border-slate-800 p-4 space-y-3">
            <Text className="text-xs font-bold text-slate-300">1. Primary Emerald Button</Text>
            <TouchableOpacity className="bg-emerald-500 py-3 rounded-xl items-center shadow-lg shadow-emerald-500/20">
              <Text className="text-slate-950 font-extrabold text-xs">Simpan Perubahan</Text>
            </TouchableOpacity>

            <Text className="text-xs font-bold text-slate-300 pt-2">2. Secondary Indigo Button</Text>
            <TouchableOpacity className="bg-indigo-600 py-3 rounded-xl items-center">
              <Text className="text-white font-extrabold text-xs">Lihat Dokumen Detail</Text>
            </TouchableOpacity>

            <Text className="text-xs font-bold text-slate-300 pt-2">3. Ghost Outline Button</Text>
            <TouchableOpacity className="border border-slate-700 py-3 rounded-xl items-center">
              <Text className="text-slate-300 font-extrabold text-xs">Batalkan Pilihan</Text>
            </TouchableOpacity>

            <Text className="text-xs font-bold text-slate-300 pt-2">4. Destructive Rose Button</Text>
            <TouchableOpacity className="bg-rose-600 py-3 rounded-xl items-center">
              <Text className="text-white font-extrabold text-xs">🗑️ Hapus Akun Permanen</Text>
            </TouchableOpacity>

            <Text className="text-xs font-bold text-slate-300 pt-2">5. Disabled Button</Text>
            <TouchableOpacity className="bg-slate-800 py-3 rounded-xl items-center opacity-50" disabled>
              <Text className="text-slate-500 font-extrabold text-xs">Memuat Data...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =====================================================================
            4. CARDS & PRODUCTS COLLECTION (NATIVEWIND)
            ===================================================================== */}
        <View className="mt-8 px-4">
          <Text className="text-[10px] font-bold text-sky-400 tracking-widest uppercase mb-1">
            KATEGORI 3
          </Text>
          <Text className="text-xl font-extrabold text-white">
            Cards Collection (Product & Analytics)
          </Text>
          <Text className="text-xs text-slate-400 mt-0.5 mb-4">
            Tokopedia E-Commerce Card, Revenue Stat Widget, & User Row Card.
          </Text>

          <View className="bg-slate-900 rounded-3xl border border-slate-800 p-4 space-y-4">
            {/* Tokopedia Product Card */}
            <Text className="text-xs font-bold text-slate-300">1. Tokopedia E-Commerce Product Card</Text>
            <View className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex-row gap-3">
              <View className="w-24 h-24 bg-white rounded-xl overflow-hidden justify-center items-center relative">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
                <View className="absolute bottom-1 left-1 bg-emerald-600 px-1.5 py-0.5 rounded">
                  <Text className="text-white text-[8px] font-extrabold">Official Store</Text>
                </View>
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-xs font-bold text-white leading-4" numberOfLines={2}>
                  Smartwatch Minimalist Series 7 Waterproof AMOLED
                </Text>
                <Text className="text-sm font-extrabold text-emerald-400 mt-1">Rp 1.499.000</Text>
                <View className="flex-row items-center gap-1.5 mt-0.5">
                  <View className="bg-rose-500/20 px-1 py-0.5 rounded">
                    <Text className="text-rose-400 text-[9px] font-bold">30%</Text>
                  </View>
                  <Text className="text-slate-500 text-[10px] line-through">Rp 2.140.000</Text>
                </View>
                <Text className="text-[10px] text-amber-400 font-bold mt-1.5">
                  ⭐ 4.9 | Terjual 1.2rb+ • Jakarta
                </Text>
              </View>
            </View>

            {/* Stat Widget Card */}
            <Text className="text-xs font-bold text-slate-300 pt-2">2. Dashboard Analytics Widget</Text>
            <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <View className="flex-row justify-between items-center">
                <Text className="text-xs font-semibold text-slate-400">Total Pendapatan Bulanan</Text>
                <View className="w-8 h-8 rounded-xl bg-emerald-500/10 items-center justify-center">
                  <Text className="text-sm">💰</Text>
                </View>
              </View>
              <Text className="text-2xl font-extrabold text-white mt-2">Rp 48.250.000</Text>
              <Text className="text-[11px] font-bold text-emerald-400 mt-1">📈 +18.4% bulan ini</Text>
            </View>

            {/* User Row List Card */}
            <Text className="text-xs font-bold text-slate-300 pt-2">3. User Management Row Card</Text>
            <View className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex-row items-center">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3 flex-1">
                <Text className="text-xs font-bold text-white">Budi Santoso</Text>
                <Text className="text-[10px] text-slate-400 mt-0.5">Senior Mobile Lead Engineer</Text>
              </View>
              <View className="bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Text className="text-emerald-400 text-[10px] font-bold">Aktif</Text>
              </View>
            </View>
          </View>
        </View>

        {/* =====================================================================
            5. FORM INPUTS & SEARCH CONTROLS (NATIVEWIND)
            ===================================================================== */}
        <View className="mt-8 px-4">
          <Text className="text-[10px] font-bold text-sky-400 tracking-widest uppercase mb-1">
            KATEGORI 4
          </Text>
          <Text className="text-xl font-extrabold text-white">
            Form Inputs & Searching
          </Text>
          <Text className="text-xs text-slate-400 mt-0.5 mb-4">
            Search Bar, Email Field, Password Toggle & Filter Chips.
          </Text>

          <View className="bg-slate-900 rounded-3xl border border-slate-800 p-4 space-y-3">
            {/* Search Bar Input */}
            <Text className="text-xs font-bold text-slate-300">1. Search Bar with Clear Icon</Text>
            <View className="bg-slate-950 border border-slate-800 rounded-xl flex-row items-center px-3.5 h-11">
              <Text className="text-sm mr-2">🔍</Text>
              <TextInput
                className="flex-1 text-xs text-white"
                placeholder="Cari komponen UI..."
                placeholderTextColor="#64748b"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text className="text-slate-400 text-xs">✖</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Email Field */}
            <Text className="text-xs font-bold text-slate-300 pt-2">2. Email Address Input</Text>
            <View className="bg-slate-950 border border-slate-800 rounded-xl flex-row items-center px-3.5 h-12">
              <Text className="text-sm mr-2.5">✉️</Text>
              <TextInput
                className="flex-1 text-xs text-white"
                placeholder="nama@email.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field with Eye Toggle */}
            <Text className="text-xs font-bold text-slate-300 pt-2">3. Password Field with Toggle</Text>
            <View className="bg-slate-950 border border-slate-800 rounded-xl flex-row items-center px-3.5 h-12">
              <Text className="text-sm mr-2.5">🔒</Text>
              <TextInput
                className="flex-1 text-xs text-white"
                placeholder="Kata sandi..."
                placeholderTextColor="#64748b"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Text className="text-base">{isPasswordVisible ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Filter Chips */}
            <Text className="text-xs font-bold text-slate-300 pt-2">4. Horizontal Filter Pills</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`px-3.5 py-2 rounded-full mr-2 border ${
                    selectedCategory === cat
                      ? 'bg-sky-600 border-sky-500'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedCategory === cat ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Space Bottom Footer */}
        <View className="h-28" />
      </ScrollView>

      {/* =====================================================================
          6. FIXED BOTTOM NAVIGATION TAB BAR (FOOTER)
          ===================================================================== */}
      <View className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex-row justify-around items-center">
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'explore', icon: '🔍', label: 'Jelajah' },
          { id: 'activity', icon: '⚡', label: 'Aktivitas' },
          { id: 'profile', icon: '👤', label: 'Profil' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            className="items-center justify-center"
            onPress={() => setActiveBottomNav(item.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-lg ${activeBottomNav === item.id ? 'opacity-100' : 'opacity-40'}`}>
              {item.icon}
            </Text>
            <Text
              className={`text-[10px] mt-0.5 ${
                activeBottomNav === item.id ? 'text-sky-400 font-bold' : 'text-slate-500 font-medium'
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* =====================================================================
          7. OFF-CANVAS MOBILE DRAWER SIDEBAR (MODAL)
          ===================================================================== */}
      <Modal
        visible={isDrawerOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsDrawerOpen(false)}
      >
        <View className="flex-1 flex-row">
          <TouchableOpacity
            className="flex-1 bg-slate-950/80"
            onPress={() => setIsDrawerOpen(false)}
            activeOpacity={1}
          />
          <View className="w-3/4 bg-slate-900 h-full p-5 justify-between border-l border-slate-800">
            {/* Drawer User Info */}
            <View className="flex-row items-center border-b border-slate-800 pb-4">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                className="w-11 h-11 rounded-full"
              />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-white">Reyhan Hamdani</Text>
                <Text className="text-[11px] text-slate-400 mt-0.5">reyhan@example.com</Text>
              </View>
              <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
                <Text className="text-slate-400 text-base">✖</Text>
              </TouchableOpacity>
            </View>

            {/* Navigation Menu List */}
            <ScrollView className="flex-1 my-4">
              <TouchableOpacity className="flex-row items-center py-3">
                <Text className="text-base w-8">👤</Text>
                <Text className="text-xs font-semibold text-slate-200">Kelola Profil Saya</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center py-3">
                <Text className="text-base w-8">📦</Text>
                <Text className="text-xs font-semibold text-slate-200">Daftar Pesanan</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center py-3">
                <Text className="text-base w-8">💳</Text>
                <Text className="text-xs font-semibold text-slate-200">Metode Pembayaran</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center py-3">
                <Text className="text-base w-8">⚙️</Text>
                <Text className="text-xs font-semibold text-slate-200">Pengaturan Aplikasi</Text>
              </TouchableOpacity>

              <View className="h-px bg-slate-800 my-3" />

              {/* Dark Mode Switch */}
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-xs font-semibold text-slate-200">🌙 Mode Gelap</Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: '#334155', true: '#10b981' }}
                  thumbColor={isDarkMode ? '#ffffff' : '#94a3b8'}
                />
              </View>
            </ScrollView>

            {/* Logout CTA */}
            <TouchableOpacity
              className="bg-rose-500/10 border border-rose-500/30 py-3 rounded-xl items-center"
              onPress={() => {
                setIsDrawerOpen(false);
                Alert.alert('Logout', 'Kamu berhasil keluar dari akun!');
              }}
            >
              <Text className="text-rose-500 font-bold text-xs">🚪 Keluar Akun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
