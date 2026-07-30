import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
 * REACT NATIVE MASTER UI KIT & COMPONENT SHOWROOM (PURE REACT NATIVE)
 * ============================================================================
 * File ini berisi kumpulan template UI Mobile terlengkap untuk belajar React Native:
 * 1. Top Bar Navigation & Search Filter
 * 2. Facebook-Style Mobile Profile Dashboard
 * 3. Primary, Secondary, Outline & Danger Buttons
 * 4. Product Cards, Stat Cards & User List Items
 * 5. Text Inputs & Password Fields with Eye Toggle
 * 6. Bottom Navigation Bar & Off-Canvas Mobile Drawer Sidebar
 * 7. Alert Banners & Modal Sheets
 * ============================================================================
 */

export default function App() {
  // State Interaktif untuk Demo UI Kit
  const [activeTab, setActiveTab] = useState('posts');
  const [activeBottomNav, setActiveBottomNav] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'React Native', 'UI/UX', 'Mobile', 'Backend'];

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* =====================================================================
          1. HEADER / TOPBAR SHOWROOM
          ===================================================================== */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIconButton}
          onPress={() => setIsDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIconText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerBadge}>⚡ REACT NATIVE UI KIT</Text>
          <Text style={styles.headerTitle}>Component Showroom</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => Alert.alert('Notifikasi', 'Kamu memiliki 3 pesan baru!')}
          activeOpacity={0.7}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* =====================================================================
            2. FACEBOOK-STYLE MOBILE PROFILE DASHBOARD
            ===================================================================== */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>KATEGORI 1</Text>
          <Text style={styles.sectionTitle}>Facebook-Style Profile Dashboard</Text>
          <Text style={styles.sectionSubtitle}>
            Profile Banner Cover, Overlapping Avatar, Verified Badge, Metric Stats, & Post Feed.
          </Text>

          <View style={styles.cardWrapper}>
            {/* Cover Banner Photo */}
            <View style={styles.coverPhotoContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' }}
                style={styles.coverPhoto}
              />
              <TouchableOpacity style={styles.editCoverButton} activeOpacity={0.8}>
                <Text style={styles.editCoverText}>📷 Edit Cover</Text>
              </TouchableOpacity>
            </View>

            {/* Avatar & Profile Identity */}
            <View style={styles.profileHeaderContent}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                  style={styles.profileAvatar}
                />
                <TouchableOpacity style={styles.avatarBadgeButton}>
                  <Text style={styles.avatarBadgeText}>📷</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.userInfoBox}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>Reyhan Hamdani</Text>
                  <Text style={styles.verifiedCheck}>✓</Text>
                </View>
                <Text style={styles.userHandle}>@reyhan.dev • Full Stack Mobile Dev</Text>
                <Text style={styles.userBio}>
                  🚀 Building high performance React Native & Node.js apps. Passionate about Clean Code & UX!
                </Text>
              </View>

              {/* Action Buttons (Add Story & Edit Profile) */}
              <View style={styles.profileActionRow}>
                <TouchableOpacity style={styles.primaryActionButton} activeOpacity={0.8}>
                  <Text style={styles.primaryActionText}>+ Add to Story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryActionButton} activeOpacity={0.8}>
                  <Text style={styles.secondaryActionText}>✏️ Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconActionButton} activeOpacity={0.8}>
                  <Text style={styles.iconActionText}>•••</Text>
                </TouchableOpacity>
              </View>

              {/* Profile Metrics Grid */}
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricNumber}>142</Text>
                  <Text style={styles.metricLabel}>Posts</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricNumber}>4.8k</Text>
                  <Text style={styles.metricLabel}>Followers</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricNumber}>320</Text>
                  <Text style={styles.metricLabel}>Following</Text>
                </View>
              </View>

              {/* Profile Tabs Navigation */}
              <View style={styles.profileTabsRow}>
                {['posts', 'photos', 'reels', 'about'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.profileTab, activeTab === tab && styles.profileTabActive]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.profileTabText,
                        activeTab === tab && styles.profileTabTextActive,
                      ]}
                    >
                      {tab.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Sample Post Feed Card */}
              <View style={styles.feedPostCard}>
                <View style={styles.postHeader}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                    style={styles.postAvatar}
                  />
                  <View style={styles.postHeaderInfo}>
                    <Text style={styles.postAuthor}>Reyhan Hamdani</Text>
                    <Text style={styles.postTime}>2 jam lalu • 🌐 Public</Text>
                  </View>
                  <Text style={styles.postMore}>•••</Text>
                </View>

                <Text style={styles.postCaption}>
                  UI Kit React Native v1.0 resmi rilis! Siap untuk dipakai belajar membangun aplikasi mobile berkelas production. 🚀🔥
                </Text>

                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' }}
                  style={styles.postImage}
                />

                {/* Social Interaction Bar */}
                <View style={styles.socialStatsRow}>
                  <Text style={styles.socialStatsText}>👍 ❤️ {likeCount} Menyukai</Text>
                  <Text style={styles.socialStatsText}>18 Komentar • 5 Diberagikan</Text>
                </View>

                <View style={styles.postActionBar}>
                  <TouchableOpacity style={styles.postActionButton} onPress={toggleLike}>
                    <Text style={[styles.postActionText, isLiked && styles.likedText]}>
                      {isLiked ? '❤️ Liked' : '🤍 Like'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postActionButton}>
                    <Text style={styles.postActionText}>💬 Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postActionButton}>
                    <Text style={styles.postActionText}>↗️ Share</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* =====================================================================
            3. BUTTONS & ACTIONS COLLECTION
            ===================================================================== */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>KATEGORI 2</Text>
          <Text style={styles.sectionTitle}>Buttons & Interactive Elements</Text>
          <Text style={styles.sectionSubtitle}>
            Kumpulan Tombol Kustom (Primary, Secondary, Outline, Danger, Disabled).
          </Text>

          <View style={styles.cardWrapperPadded}>
            <Text style={styles.componentSubLabel}>1. Primary Button</Text>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryText}>Simpan Perubahan</Text>
            </TouchableOpacity>

            <Text style={styles.componentSubLabel}>2. Secondary Button</Text>
            <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}>
              <Text style={styles.btnSecondaryText}>Lihat Detail Dokumen</Text>
            </TouchableOpacity>

            <Text style={styles.componentSubLabel}>3. Outline Ghost Button</Text>
            <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8}>
              <Text style={styles.btnOutlineText}>Batalkan Transaksi</Text>
            </TouchableOpacity>

            <Text style={styles.componentSubLabel}>4. Destructive / Danger Button</Text>
            <TouchableOpacity style={styles.btnDanger} activeOpacity={0.8}>
              <Text style={styles.btnDangerText}>🗑️ Hapus Akun Permanen</Text>
            </TouchableOpacity>

            <Text style={styles.componentSubLabel}>5. Disabled Button</Text>
            <TouchableOpacity style={styles.btnDisabled} disabled={true}>
              <Text style={styles.btnDisabledText}>Proses Memuat...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =====================================================================
            4. CARDS COLLECTION (E-COMMERCE & WIDGETS)
            ===================================================================== */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>KATEGORI 3</Text>
          <Text style={styles.sectionTitle}>Cards & Widget Collections</Text>
          <Text style={styles.sectionSubtitle}>
            Kartu Produk Tokopedia Style, Stat Widget Dashboard, & User Row Card.
          </Text>

          <View style={styles.cardWrapperPadded}>
            {/* Tokopedia Product Card */}
            <Text style={styles.componentSubLabel}>1. E-Commerce Product Card</Text>
            <View style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }}
                  style={styles.productImage}
                />
                <View style={styles.officialBadge}>
                  <Text style={styles.officialBadgeText}>✓ Official Store</Text>
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  Smartwatch Minimalist Series 7 Waterproof AMOLED Display
                </Text>
                <Text style={styles.productPrice}>Rp 1.499.000</Text>
                <View style={styles.discountRow}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>30%</Text>
                  </View>
                  <Text style={styles.originalPrice}>Rp 2.140.000</Text>
                </View>
                <View style={styles.productFooter}>
                  <Text style={styles.ratingText}>⭐ 4.9 | Terjual 1.2rb+</Text>
                  <Text style={styles.locationText}>📍 Jakarta Pusat</Text>
                </View>
              </View>
            </View>

            {/* Stat Widget Card */}
            <Text style={styles.componentSubLabel}>2. Analytics Stat Card</Text>
            <View style={styles.statWidgetCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Total Pendapatan Bulanan</Text>
                <View style={styles.statIconBox}>
                  <Text style={styles.statIconText}>💰</Text>
                </View>
              </View>
              <Text style={styles.statValue}>Rp 48.250.000</Text>
              <View style={styles.statGrowthRow}>
                <Text style={styles.statGrowthText}>📈 +18.4% bulan ini</Text>
              </View>
            </View>

            {/* User Row Card */}
            <Text style={styles.componentSubLabel}>3. User List Item Card</Text>
            <View style={styles.userRowCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }}
                style={styles.userRowAvatar}
              />
              <View style={styles.userRowInfo}>
                <Text style={styles.userRowName}>Budi Santoso</Text>
                <Text style={styles.userRowRole}>Senior Lead Engineer</Text>
              </View>
              <View style={styles.statusActiveBadge}>
                <Text style={styles.statusActiveText}>Aktif</Text>
              </View>
            </View>
          </View>
        </View>

        {/* =====================================================================
            5. FORM CONTROLS & INPUTS
            ===================================================================== */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>KATEGORI 4</Text>
          <Text style={styles.sectionTitle}>Form Inputs & Search Controls</Text>
          <Text style={styles.sectionSubtitle}>
            Custom Input Fields, Search Filter, & Category Pill Selection Chips.
          </Text>

          <View style={styles.cardWrapperPadded}>
            {/* Search Input Bar */}
            <Text style={styles.componentSubLabel}>1. Search Bar with Clear Button</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari komponen, produk, atau user..."
                placeholderTextColor="#64748b"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={styles.searchClear}>✖</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Standard Text Input */}
            <Text style={styles.componentSubLabel}>2. Email Input Field</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.inputField}
                placeholder="nama@domain.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field with Eye Toggle */}
            <Text style={styles.componentSubLabel}>3. Password Field with Show/Hide Toggle</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Masukkan kata sandi..."
                placeholderTextColor="#64748b"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Text style={styles.eyeToggleText}>{isPasswordVisible ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Category Pill Chips */}
            <Text style={styles.componentSubLabel}>4. Horizontal Category Filter Pills</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.pillItem, selectedCategory === cat && styles.pillItemActive]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.pillText, selectedCategory === cat && styles.pillTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Space Footer Bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* =====================================================================
          6. MOBILE BOTTOM NAVIGATION BAR
          ===================================================================== */}
      <View style={styles.bottomTabBar}>
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'explore', icon: '🔍', label: 'Jelajah' },
          { id: 'activity', icon: '⚡', label: 'Aktivitas' },
          { id: 'profile', icon: '👤', label: 'Profil' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.tabItem}
            onPress={() => setActiveBottomNav(item.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, activeBottomNav === item.id && styles.tabIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.tabLabel, activeBottomNav === item.id && styles.tabLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* =====================================================================
          7. OFF-CANVAS MOBILE DRAWER SIDEBAR MODAL
          ===================================================================== */}
      <Modal
        visible={isDrawerOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsDrawerOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setIsDrawerOpen(false)}
            activeOpacity={1}
          />
          <View style={styles.drawerContent}>
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                style={styles.drawerAvatar}
              />
              <View style={styles.drawerHeaderInfo}>
                <Text style={styles.drawerUserName}>Reyhan Hamdani</Text>
                <Text style={styles.drawerUserEmail}>reyhan@example.com</Text>
              </View>
              <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
                <Text style={styles.closeDrawerText}>✖</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.drawerMenuList}>
              <TouchableOpacity style={styles.drawerMenuItem}>
                <Text style={styles.drawerMenuIcon}>👤</Text>
                <Text style={styles.drawerMenuText}>Kelola Profil Saya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerMenuItem}>
                <Text style={styles.drawerMenuIcon}>📦</Text>
                <Text style={styles.drawerMenuText}>Daftar Pesanan Belanja</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerMenuItem}>
                <Text style={styles.drawerMenuIcon}>💳</Text>
                <Text style={styles.drawerMenuText}>Metode Pembayaran</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerMenuItem}>
                <Text style={styles.drawerMenuIcon}>⚙️</Text>
                <Text style={styles.drawerMenuText}>Pengaturan Aplikasi</Text>
              </TouchableOpacity>

              <View style={styles.drawerDivider} />

              {/* Dark Mode Switch */}
              <View style={styles.drawerSwitchRow}>
                <Text style={styles.drawerMenuText}>🌙 Mode Gelap (Dark Theme)</Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: '#334155', true: '#10b981' }}
                  thumbColor={isDarkMode ? '#ffffff' : '#94a3b8'}
                />
              </View>
            </ScrollView>

            {/* Drawer Footer Logout */}
            <TouchableOpacity
              style={styles.drawerLogoutButton}
              onPress={() => {
                setIsDrawerOpen(false);
                Alert.alert('Logout', 'Kamu berhasil keluar dari akun!');
              }}
            >
              <Text style={styles.drawerLogoutText}>🚪 Keluar Akun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

/**
 * ============================================================================
 * STYLESHEET DEFINITION (100% PURE REACT NATIVE STYLES)
 * ============================================================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },

  // Header Bar
  header: {
    height: 64,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuIconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconText: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 18,
  },
  badgeCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#f43f5e',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Section Headers
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#38bdf8',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
    marginBottom: 16,
  },

  // Cards Container
  cardWrapper: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
  },
  cardWrapperPadded: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
  },

  // Facebook Profile Header
  coverPhotoContainer: {
    height: 140,
    backgroundColor: '#1e293b',
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editCoverText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  profileHeaderContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarWrapper: {
    marginTop: -45,
    marginBottom: 12,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#0f172a',
  },
  avatarBadgeButton: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    backgroundColor: '#0284c7',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  avatarBadgeText: {
    fontSize: 12,
  },
  userInfoBox: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  verifiedCheck: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
  },
  userHandle: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '600',
    marginTop: 2,
  },
  userBio: {
    fontSize: 13,
    color: '#cbd5e1',
    marginTop: 8,
    lineHeight: 18,
  },

  // Action Buttons Profile
  profileActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryActionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconActionButton: {
    width: 42,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconActionText: {
    color: '#ffffff',
    fontSize: 14,
  },

  // Profile Metrics
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },

  // Profile Tabs
  profileTabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    marginBottom: 16,
  },
  profileTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  profileTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#0284c7',
  },
  profileTabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  profileTabTextActive: {
    color: '#0284c7',
  },

  // Feed Post Card
  feedPostCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  postAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  postTime: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 1,
  },
  postMore: {
    color: '#94a3b8',
    fontSize: 16,
  },
  postCaption: {
    fontSize: 13,
    color: '#e2e8f0',
    lineHeight: 19,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  socialStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  socialStatsText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  postActionBar: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  postActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  postActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  likedText: {
    color: '#f43f5e',
  },

  // Component Sublabels
  componentSubLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#cbd5e1',
    marginTop: 12,
    marginBottom: 6,
  },

  // Buttons
  btnPrimary: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#090d16',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnSecondary: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnOutlineText: {
    color: '#cbd5e1',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnDanger: {
    backgroundColor: '#f43f5e',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnDangerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnDisabled: {
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    opacity: 0.6,
  },
  btnDisabledText: {
    color: '#64748b',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // E-Commerce Product Card
  productCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 10,
    gap: 12,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  officialBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#10b981',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  officialBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'extrabold',
    color: '#10b981',
    marginTop: 4,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: '#f43f5e',
    fontSize: 10,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 10,
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  productFooter: {
    marginTop: 6,
  },
  ratingText: {
    fontSize: 10,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 1,
  },

  // Stat Widget Card
  statWidgetCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconText: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'extrabold',
    color: '#ffffff',
    marginTop: 8,
  },
  statGrowthRow: {
    marginTop: 4,
  },
  statGrowthText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#10b981',
  },

  // User Row Item
  userRowCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRowAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userRowInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userRowName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userRowRole: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  statusActiveBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  statusActiveText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Forms & Inputs
  searchContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  searchClear: {
    color: '#94a3b8',
    fontSize: 12,
    padding: 4,
  },
  inputWrapper: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#334155',
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  eyeToggleText: {
    fontSize: 16,
    padding: 4,
  },

  // Category Pills
  pillsScroll: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  pillItem: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pillItemActive: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  pillText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // Bottom Navigation Bar
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#0f172a',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },

  // Modal Off-Canvas Drawer
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
  },
  drawerContent: {
    width: width * 0.78,
    backgroundColor: '#0f172a',
    height: '100%',
    padding: 20,
    justifyContent: 'space-between',
    borderLeftWidth: 1,
    borderLeftColor: '#1e293b',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 16,
  },
  drawerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  drawerHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  drawerUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  drawerUserEmail: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  closeDrawerText: {
    color: '#94a3b8',
    fontSize: 16,
    padding: 4,
  },
  drawerMenuList: {
    flex: 1,
    marginVertical: 16,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  drawerMenuIcon: {
    fontSize: 16,
    width: 32,
  },
  drawerMenuText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginVertical: 12,
  },
  drawerSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  drawerLogoutButton: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  drawerLogoutText: {
    color: '#f43f5e',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
