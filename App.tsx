import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

type Screen = "login" | "home" | "profile";
type HomeCard = "upload" | "quiz" | "forum" | "database";

const CARD_META: Record<HomeCard, { title: string; subtitle: string }> = {
  upload: { title: "Upload", subtitle: "Cases and Files" },
  quiz: { title: "Quiz", subtitle: "Daily Questions" },
  forum: { title: "Forum", subtitle: "Department Threads" },
  database: { title: "Database", subtitle: "Book Summaries" },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeCard, setActiveCard] = useState<HomeCard>("upload");
  const { width } = useWindowDimensions();

  const isDesktop = width >= 920;
  const cardWidth = useMemo(() => {
    if (width > 1100) return "48%";
    if (width > 760) return "48%";
    return "100%";
  }, [width]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.bgCore} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {screen === "login" && (
        <View style={styles.page}>
          <View style={[styles.loginShell, isDesktop && styles.loginShellDesktop]}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={styles.loginCard}>
              <TextInput
                placeholder="User"
                placeholderTextColor="#87a3c6"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Pass"
                placeholderTextColor="#87a3c6"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <Pressable style={styles.primaryBtn} onPress={() => setScreen("home")}>
                <Text style={styles.primaryBtnText}>Enter</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Continue with Google</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {screen === "home" && (
        <View style={styles.page}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.hello}>Hi</Text>
              <View style={styles.helloLine} />
            </View>
            <Pressable style={styles.profileChip} onPress={() => setScreen("profile")}>
              <Text style={styles.profileChipText}>View Profile</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.gridWrap} showsVerticalScrollIndicator={false}>
            {(Object.keys(CARD_META) as HomeCard[]).map((card) => (
              <Pressable
                key={card}
                onPress={() => setActiveCard(card)}
                style={[
                  styles.homeCard,
                  { width: cardWidth as any },
                  activeCard === card && styles.homeCardActive,
                ]}
              >
                <Text style={styles.homeCardTitle}>{CARD_META[card].title}</Text>
                <Text style={styles.homeCardSubtitle}>{CARD_META[card].subtitle}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.bottomBar}>
            <Pressable style={styles.bottomItem}>
              <Text style={styles.bottomItemActive}>Home</Text>
            </Pressable>
            <Pressable style={styles.bottomItem}>
              <Text style={styles.bottomItemText}>Modules</Text>
            </Pressable>
            <Pressable style={styles.bottomItem} onPress={() => setScreen("profile")}>
              <Text style={styles.bottomItemText}>Profile</Text>
            </Pressable>
          </View>
        </View>
      )}

      {screen === "profile" && (
        <View style={styles.page}>
          <View style={styles.profileHeader}>
            <Pressable onPress={() => setScreen("home")}>
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Text style={styles.pageTitle}>User Profile</Text>
          </View>

          <View style={styles.profileShell}>
            <View style={styles.profileInner}>
              <Text style={styles.profileName}>Dr. Resident Name</Text>
              <Text style={styles.profileMeta}>Radiology Resident</Text>
              <View style={styles.profileDivider} />
              <Text style={styles.profileMeta}>Email: resident@radiochh.app</Text>
              <Text style={styles.profileMeta}>Batch: 2026</Text>
              <Text style={styles.profileMeta}>Department: Radiology</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#031027",
  },
  bgCore: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#031027",
  },
  glowTop: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 240,
    backgroundColor: "#0f4f84",
    opacity: 0.3,
    top: -170,
    right: -120,
  },
  glowBottom: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 220,
    backgroundColor: "#2b2f95",
    opacity: 0.2,
    bottom: -190,
    left: -140,
  },
  page: {
    flex: 1,
    width: "100%",
    maxWidth: 1050,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  pageTitle: {
    color: "#f4f9ff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 14,
  },
  loginShell: {
    flex: 1,
    justifyContent: "center",
  },
  loginShellDesktop: {
    alignItems: "center",
  },
  loginCard: {
    backgroundColor: "#061937",
    borderWidth: 1,
    borderColor: "#1b3f6a",
    borderRadius: 30,
    padding: 20,
    width: "100%",
    maxWidth: 560,
    shadowColor: "#7f9cff",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  input: {
    backgroundColor: "#082040",
    borderColor: "#2d4f78",
    borderWidth: 1,
    color: "#f4f9ff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 16,
  },
  primaryBtn: {
    marginTop: 8,
    backgroundColor: "#5760f8",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#2a466b",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#071c3a",
  },
  secondaryBtnText: {
    color: "#b6c9e0",
    fontWeight: "600",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  hello: {
    color: "#f4f9ff",
    fontSize: 34,
    fontWeight: "700",
  },
  helloLine: {
    marginTop: 6,
    width: 110,
    height: 2,
    backgroundColor: "#3d6f9f",
  },
  profileChip: {
    backgroundColor: "#0c2a4e",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#335d8f",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  profileChipText: {
    color: "#cfe2fb",
    fontWeight: "700",
  },
  gridWrap: {
    paddingBottom: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  homeCard: {
    minHeight: 180,
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#062248",
    borderWidth: 1,
    borderColor: "#18457b",
    justifyContent: "space-between",
  },
  homeCardActive: {
    backgroundColor: "#0a2f63",
    borderColor: "#759ffc",
  },
  homeCardTitle: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 30,
    letterSpacing: 0.3,
  },
  homeCardSubtitle: {
    color: "#a4c0e5",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomBar: {
    marginTop: "auto",
    marginBottom: 2,
    backgroundColor: "#051730",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#193a63",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  bottomItemActive: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  bottomItemText: {
    color: "#7ea2ca",
    fontWeight: "600",
    fontSize: 14,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backText: {
    color: "#9ec0e6",
    fontWeight: "700",
    fontSize: 15,
  },
  profileShell: {
    flex: 1,
    backgroundColor: "#061937",
    borderRadius: 30,
    borderColor: "#1b3f6a",
    borderWidth: 1,
    padding: 16,
  },
  profileInner: {
    flex: 1,
    backgroundColor: "#072246",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2d5a8d",
    padding: 18,
  },
  profileName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileMeta: {
    color: "#b2c8e1",
    fontSize: 15,
    marginBottom: 8,
  },
  profileDivider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#2f5279",
  },
});
