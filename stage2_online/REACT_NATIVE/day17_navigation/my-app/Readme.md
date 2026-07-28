# 📌 React Navigation Code Reference & Hints

Dokumen petunjuk simpel untuk melihat letak setiap materi React Navigation pada kode di project ini (**`App.tsx`**, **`HomeScreen.tsx`**, **`DetailScreen.tsx`**, dan **`ProfileScreen.tsx`**).

---

## 🏬 Pengibaratan Dunia Nyata: _Sistem Rumah Sakit & Papan Petunjuk_

- **NavigationContainer:** Bangunan utama rumah sakit. Semua alur pengunjung berada di dalam bangunan ini.
- **Native Stack Navigator:** Koridor lorong lurus yang menumpuk ruangan (MainApp ➔ Detail).
- **Bottom Tab Navigator:** Menu bilah navigasi utama di bagian bawah untuk berpindah antar ruangan (Tab Beranda ↔ Tab Profil).
- **Nesting Navigation:** Memasukkan seluruh area lantai utama (Bottom Tab) ke dalam gerbang lorong gedung utama (Stack Navigator).
- **Passing Parameters:** Catatan rekam medis pasien yang dibawa oleh suster saat memindahkan pasien dari meja pendaftaran ke ruang periksa.
  > 💡 **Kesimpulan:** Stack Navigator mengatur tumpukan kedalaman layar, Bottom Tab Navigator menyajikan menu utama di bawah, dan Nesting Navigation menggabungkan keduanya secara harmonis.

---

## 📊 1. Tabel Ringkasan Lokasi Kode (Quick Reference Map)

| Topik Utama | Konsep / Komponen | Lokasi File & Baris | Fungsi / Kegunaan |
| :--- | :--- | :--- | :--- |
| **#1 - Navigation (Stack)** | Core Imports | **`App.tsx`** (Baris 1 - 3) | Mengimpor `NavigationContainer` & `createNativeStackNavigator` |
| | Tipe TypeScript Stack | **`App.tsx`** (Baris 11 - 15) | Definisi `RootStackParalist` untuk type-safety |
| | Inisialisasi Stack | **`App.tsx`** (Baris 22) | Membuat instance `const Stack = createNativeStackNavigator()` |
| | `<NavigationContainer>` | **`App.tsx`** (Baris 68 & 85) | Pembungkus paling luar navigasi |
| | `<Stack.Navigator>` | **`App.tsx`** (Baris 69 & 84) | Kontainer penumpuk halaman (Stack) |
| | `<Stack.Screen>` Detail | **`App.tsx`** (Baris 71 - 83) | Pendaftaran layar `DetailScreen` |
| | Aksi Kembali | **`DetailScreen.tsx`** (Baris 34) | Tombol `navigation.goBack()` untuk kembali |
| **#2 - Parameters & Header** | Kirim Data ke Detail | **`HomeScreen.tsx`** (Baris 74) | `navigation.navigate("Detail", { product: item })` |
| | Kirim Data ke Profile | **`HomeScreen.tsx`** (Baris 90) | `navigation.navigate("ProfileTab", { id: 1, name: "..." })` |
| | Terima Data di Detail | **`DetailScreen.tsx`** (Baris 10) | `const { product } = route.params;` |
| | Terima Data di Profile | **`ProfileScreen.tsx`** (Baris 9) | `const { name } = route.params \|\| {};` |
| | Type Screen Props | **`DetailScreen.tsx`** (Baris 6) | `NativeStackScreenProps<RootStackParalist, "Detail">` |
| | Type Tab Props | **`ProfileScreen.tsx`** (Baris 6) | `BottomTabScreenProps<RootTabParamList, "ProfileTab">` |
| | Options Header Native | **`App.tsx`** (Baris 74 - 82) | Setting `title`, `headerStyle`, & `headerTintColor` |
| | Custom Header UI | **`HomeScreen.tsx`** (Baris 84 - 93) | Header UI buatan sendiri di komponen ("Welcome Rey") |
| **#3 - Bottom Tab & Nesting** | Import Tab & Icons | **`App.tsx`** (Baris 8 - 9) | Mengimpor `createBottomTabNavigator` & `Ionicons` |
| | Tipe TypeScript Tab | **`App.tsx`** (Baris 17 - 20) | Definisi `RootTabParamList` untuk Tab |
| | Inisialisasi Tab | **`App.tsx`** (Baris 23) | Membuat instance `const Tab = createBottomTabNavigator()` |
| | Komponen `BottomTabs()` | **`App.tsx`** (Baris 25 - 63) | Fungsi pembungkus Bottom Tab Navigator |
| | Render Ikon Dinamis | **`App.tsx`** (Baris 29 - 39) | Logika penentuan ikon aktif (`focused`) |
| | Styling Tab Bar | **`App.tsx`** (Baris 42 - 49) | Mengatur `height: 65`, `paddingTop`, `paddingBottom`, `opacity` |
| | Warna Tint Aktif/Pasif | **`App.tsx`** (Baris 40 - 41) | `tabBarActiveTintColor` & `tabBarInactiveTintColor` |
| | Tab Screens | **`App.tsx`** (Baris 59 - 60) | Mendaftarkan `HomeTab` & `ProfileTab` |
| | **Nesting Navigation** | **`App.tsx`** (Baris 70) | `<Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />` |

---

## 📝 2. Rincian Penjelasan Per Topik

### #1 - Navigation (Native Stack Navigator)
* **Import Navigation Core:** **`App.tsx`** (Baris 1 - 3)
* **Definisi Tipe Stack:** **`App.tsx`** (Baris 11 - 15)
* **Komponen Stack Navigator:** **`App.tsx`** (Baris 69 - 84)
* **Aksi Back (GoBack):** **`DetailScreen.tsx`** (Baris 34) & **`ProfileScreen.tsx`** (Baris 19)

---

### #2 - Passing Parameters & Custom Header
* **Kirim Params dari HomeScreen:** **`HomeScreen.tsx`** (Baris 74 & 90)
* **Terima Params di DetailScreen:** **`DetailScreen.tsx`** (Baris 10)
* **Terima Params di ProfileScreen:** **`ProfileScreen.tsx`** (Baris 9)
* **Type-Safety Screen Props:** **`DetailScreen.tsx`** (Baris 6) & **`ProfileScreen.tsx`** (Baris 6)
* **Custom Options Header Native:** **`App.tsx`** (Baris 74 - 82)
* **Custom Header UI Komponen:** **`HomeScreen.tsx`** (Baris 84 - 93)

---

### #3 - Bottom Tab Navigator & Nesting Navigation
* **Import & Inisialisasi Tab:** **`App.tsx`** (Baris 8 - 9 & 23)
* **Definisi Tipe Tab:** **`App.tsx`** (Baris 17 - 20)
* **Komponen `BottomTabs`:** **`App.tsx`** (Baris 25 - 63)
* **Ikon Dinamis (`Ionicons`):** **`App.tsx`** (Baris 29 - 39)
* **Styling Bar (Height/Padding/Colors):** **`App.tsx`** (Baris 40 - 49)
* **Nesting Navigation (Tab di dalam Stack):** **`App.tsx`** (Baris 70) (`<Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />`)

---

## ❌ Contoh Kode SALAH vs ✅ Kode BENAR

### ❌ KODE SALAH:

```tsx
// 1. Sintaks Params di luar kurung navigate
onPress={(() => navigation.navigate("Profile"), { id: 1, name: "rey" })}

// 2. String warna kosong pada Tab Bar
tabBarActiveTintColor: "",

// 3. Memasukkan ProfileScreen berulang ke dalam Stack padahal sudah ada di Tab
<Stack.Screen name="Profile" component={ProfileScreen} />
```

### ✅ KODE BENAR:

```tsx
// 1. Params berada DI DALAM kurung fungsi navigate
onPress={() => navigation.navigate("ProfileTab", { id: 1, name: "Raihan Hamdani" })}

// 2. Kode warna hex yang valid
tabBarActiveTintColor: "#10b981",

// 3. Nesting: Cukup jadikan BottomTabs sebagai layar utama Stack
<Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />
```
