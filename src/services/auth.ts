// // Declare Webflow types
// declare global {
//     interface Window {
//       webflow: {
//         getIdToken: () => Promise<string>;
//         setExtensionSize: (size: string) => void;
//       };
//     }
//   }
//   interface User {
//     _id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//   }
//   interface AuthResponse {
//     sessionToken: string;
//     exp: number;
//     user: User;
//   }

  
//   export class AuthService {
//     private static instance: AuthService;
//     private baseUrl: string;
//     private sessionToken: string | null = null;
//     private currentUser: User | null = null;
//     private constructor() {
//       // Use the deployed Cloudflare Worker URL
//       this.baseUrl = "https://webflow-auth.web-8fb.workers.dev";
//       this.sessionToken = localStorage.getItem("sessionToken");
//       const userStr = localStorage.getItem("user");
//       if (userStr) {
//         this.currentUser = JSON.parse(userStr);
//       }
//       console.log("AuthService initialized with baseUrl:", this.baseUrl);
//     }
//     public static getInstance(): AuthService {
//       if (!AuthService.instance) {
//         AuthService.instance = new AuthService();
//       }
//       return AuthService.instance;
//     }
//     public async authorize(): Promise<AuthResponse> {
//       try {
//         console.log("Starting authorization process...");
//         // Get ID token from Webflow
//         console.log("Getting ID token from Webflow...");
//         const idToken = await window.webflow.getIdToken();
//         console.log("Received ID token from Webflow");
//         // Exchange ID token for session token
//         console.log("Exchanging ID token for session token...");
//         const response = await fetch(`${this.baseUrl}/token`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ idToken }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Token exchange failed:", response.status, errorData);
//           throw new Error(errorData.error || "Failed to authorize");
//         }
//         const data: AuthResponse = await response.json();
//         console.log("Token exchange successful");
//         // Store session data
//         this.sessionToken = data.sessionToken;
//         this.currentUser = data.user;
//         localStorage.setItem("sessionToken", data.sessionToken);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         console.log("Session data stored");
//         return data;
//       } catch (error) {
//         console.error("Authorization error:", error);
//         throw error;
//       }
//     }
//     public logout(): void {
//       console.log("Logging out...");
//       this.sessionToken = null;
//       this.currentUser = null;
//       localStorage.removeItem("sessionToken");
//       localStorage.removeItem("user");
//       console.log("Session cleared");
//     }
//     public isAuthenticated(): boolean {
//       const hasToken = !!this.sessionToken;
//       console.log(
//         "Checking authentication status:",
//         hasToken ? "Authenticated" : "Not authenticated"
//       );
//       return hasToken;
//     }
//     public getSessionToken(): string | null {
//       return this.sessionToken;
//     }
//     public getCurrentUser(): User | null {
//       return this.currentUser;
//     }
//   }