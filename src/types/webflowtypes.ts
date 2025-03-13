// ✅ Define a WebflowStyle interface for styling properties
export interface WebflowStyle {
    setProperty: (prop: string, value: string) => Promise<void>;
    setProperties: (properties: Record<string, string>) => Promise<void>;
    save: () => Promise<void>;
  }
  
  // ✅ Define a Webflow API interface
  export interface WebflowAPI {
    getSiteInfo: () => Promise<{
      siteId: string;
      siteName: string;
      shortName: string;
    }>;
  
    getSelectedElement: () => Promise<{
      before: (preset: any) => Promise<{
        setInnerHTML: (html: string) => Promise<void>;
        setStyles?: (styles: WebflowStyle[]) => Promise<void>;
        getStyles?: () => Promise<Record<string, string>>;
        applyStyle?: (style: WebflowStyle) => Promise<void>;
        setAttributes?: (attrs: Record<string, string>) => Promise<void>;
      }>;
      append?: (child: any) => Promise<void>;
      setStyles?: (styles: WebflowStyle[]) => Promise<void>;
      getStyles?: () => Promise<Record<string, string>>;
      setAttributes?: (attrs: Record<string, string>) => Promise<void>;
    }>;
  
    elementPresets: {
      DivBlock: any;
      Paragraph?: any;
      Heading?: any;
      Button?: any;
      DOM?: any;
    };
  
    getRootElement: () => Promise<{
      setInnerHTML: (html: string) => Promise<void>;
    }>;
  
    elementBuilder: (options: {
      tag: string;
      attributes?: Record<string, string>;
    }) => Promise<{
      setAttributes?: (attrs: Record<string, string>) => Promise<void>;
      setStyles?: (styles: WebflowStyle[]) => Promise<void>;
      append?: (child: any) => Promise<void>;
    }>;
  
    getCurrentPage: () => Promise<{ id: string; name: string }>;
    createPage: (options: { name: string; content: string }) => Promise<{ id: string }>;
    switchPage?: (pageId: string) => Promise<void>;
    getAllPagesAndFolders?: () => Promise<Array<{ id: string; type: string; getName: () => Promise<string> }>>;
  
    createStyle: (name: string) => Promise<WebflowStyle>;
    getStyleByName: (name: string) => Promise<WebflowStyle | null>;
    getAllStyles?: () => Promise<WebflowStyle[]>;
    removeStyle?: (styleId: string) => Promise<void>;
  
    getDefaultVariableCollection?: () => Promise<{
      createColorVariable: (name: string, value: string) => Promise<ColorVariable>;
    }>;
  
    notify: (options: { type: "info" | "error"; message: string }) => Promise<void>;
  
    getMediaQuery?: () => Promise<string>;
    getCurrentAppConnection?: () => Promise<{ id: string; name: string }>;
    getAllAssets?: () => Promise<Array<{ id: string; name: string; url: string }>>;
  }
  
  // ✅ Declare Webflow globally
  declare const webflow: WebflowAPI;
  export default webflow;
  

  // declare const webflow: {
  //   // ✅ Get Site Info
  //   getSiteInfo: () => Promise<{
  //     siteId: string;
  //     siteName: string;
  //     shortName: string;
  //   }>;
  
  //   // ✅ Get the currently selected element
  //   getSelectedElement: () => Promise<{
  //     before: (preset: any) => Promise<{
  //       setInnerHTML: (html: string) => Promise<void>;
  //       setStyles?: (styles: WebflowStyle[]) => Promise<void>;
  //       getStyles?: () => Promise<Record<string, string>>;
  //       applyStyle?: (style: WebflowStyle) => Promise<void>;
  //       setAttributes?: (attrs: Record<string, string>) => Promise<void>;
  //     }>;
  //     append?: (child: any) => Promise<void>; // ✅ Added append method
  //     setStyles?: (styles: WebflowStyle[]) => Promise<void>;
  //     getStyles?: () => Promise<Record<string, string>>;
  //     setAttributes?: (attrs: Record<string, string>) => Promise<void>;
  //   }>;
  
  //   // ✅ Webflow Element Presets
  //   elementPresets: {
  //     DivBlock: any;
  //     Paragraph?: any;
  //     Heading?: any;
  //     Button?: any;
  //     DOM?: any; // ✅ Ensure DOM preset exists
  //   };
  
  //   // ✅ Get the root element of the page
  //   getRootElement: () => Promise<{
  //     setInnerHTML: (html: string) => Promise<void>;
  //   }>;
  
  //   // ✅ Element Builder (with append support)
  //   elementBuilder: (options: {
  //     tag: string;
  //     attributes?: Record<string, string>;
  //   }) => Promise<{
  //     setAttributes?: (attrs: Record<string, string>) => Promise<void>;
  //     setStyles?: (styles: WebflowStyle[]) => Promise<void>;
  //     append?: (child: any) => Promise<void>; // ✅ Added append method
  //   }>;
  
  //   // ✅ Page Management
  //   getCurrentPage: () => Promise<{ id: string; name: string }>;
  //   createPage: (options: { name: string; content: string }) => Promise<{ id: string }>;
  //   switchPage?: (pageId: string) => Promise<void>;
  //   getAllPagesAndFolders?: () => Promise<Array<{ id: string; type: string; getName: () => Promise<string> }>>;
  
  //   // ✅ Style Management
  //   createStyle: (name: string) => Promise<WebflowStyle>;
  //   getStyleByName: (name: string) => Promise<WebflowStyle | null>;
  //   getAllStyles?: () => Promise<WebflowStyle[]>;
  //   removeStyle?: (styleId: string) => Promise<void>;
  
  //   // ✅ Variables and Collections
  //   getDefaultVariableCollection?: () => Promise<{
  //     createColorVariable: (name: string, value: string) => Promise<ColorVariable>;
  //   }>;
  
  //   // ✅ Notifications
  //   notify: (options: { type: "info" | "error"; message: string }) => Promise<void>;
  
  //   // ✅ Additional Webflow Methods
  //   getMediaQuery?: () => Promise<string>;
  //   getCurrentAppConnection?: () => Promise<{ id: string; name: string }>;
  //   getAllAssets?: () => Promise<Array<{ id: string; name: string; url: string }>>;
  // };
  
  
  
  // ✅ Define a WebflowStyle interface for styling properties
  // interface WebflowStyle {
  //   setProperty: (prop: string, value: string) => Promise<void>;
  //   setProperties: (properties: Record<string, string>) => Promise<void>;
  //   save: () => Promise<void>;
  
  // }
  