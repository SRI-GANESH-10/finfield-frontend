import os
import sys

# -----------------------
# HELPERS
# -----------------------

def to_pascal_case(name: str):
    return "".join(word.capitalize() for word in name.replace("_", "-").split("-"))

def to_camel_case(name: str):
    pascal = to_pascal_case(name)
    return pascal[0].lower() + pascal[1:]

def safe_write(path, content):
    if not os.path.exists(path):
        with open(path, "w") as f:
            f.write(content)

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def get_base():
    return "src" if os.path.exists("src") else ""

# -----------------------
# MAIN GENERATOR
# -----------------------

def create_feature(feature_name):
    base = get_base()

    pascal = to_pascal_case(feature_name)
    camel = to_camel_case(feature_name)

    # -----------------------
    # FEATURE FOLDER
    # -----------------------
    feature_root = os.path.join(base, "features", feature_name)
    ensure_dir(feature_root)

    folders = ["components", "hooks", "services", "store", "models"]

    for folder in folders:
        ensure_dir(os.path.join(feature_root, folder))

    # -----------------------
    # COMPONENT
    # -----------------------
    component_file = os.path.join(feature_root, "components", f"{pascal}Page.tsx")

    safe_write(component_file, f"""export const {pascal}Page = () => {{
  return (
    <div>
      {feature_name}
    </div>
  );
}};
""")

    # components index
    with open(os.path.join(feature_root, "components", "index.ts"), "w") as f:
        f.write(f"export * from './{pascal}Page';\n")

    # -----------------------
    # HOOK
    # -----------------------
    hook_file = os.path.join(feature_root, "hooks", f"use{pascal}.ts")

    safe_write(hook_file, f"""export const use{pascal} = () => {{
  return {{}};
}};
""")

    with open(os.path.join(feature_root, "hooks", "index.ts"), "w") as f:
        f.write(f"export * from './use{pascal}';\n")

    # -----------------------
    # SERVICE
    # -----------------------
    service_file = os.path.join(feature_root, "services", f"{feature_name}.service.ts")

    safe_write(service_file, f"""export const {camel}Service = {{}};
""")

    with open(os.path.join(feature_root, "services", "index.ts"), "w") as f:
        f.write(f"export * from './{feature_name}.service';\n")

    # -----------------------
    # STORE
    # -----------------------
    store_file = os.path.join(feature_root, "store", f"{feature_name}.store.ts")

    safe_write(store_file, f"""export const use{pascal}Store = () => {{
  return {{}};
}};
""")

    with open(os.path.join(feature_root, "store", "index.ts"), "w") as f:
        f.write(f"export * from './{feature_name}.store';\n")

    # -----------------------
    # MODEL
    # -----------------------
    model_file = os.path.join(feature_root, "models", f"{feature_name}.model.ts")

    safe_write(model_file, f"""export interface {pascal} {{
  id: string;
}}
""")

    with open(os.path.join(feature_root, "models", "index.ts"), "w") as f:
        f.write(f"export * from './{feature_name}.model';\n")

    # -----------------------
    # FEATURE ROOT INDEX
    # -----------------------
    with open(os.path.join(feature_root, "index.ts"), "w") as f:
        f.write("""export * from './components';
export * from './hooks';
export * from './services';
export * from './store';
export * from './models';
""")

    # -----------------------
    # APP ROUTE (routes group)
    # -----------------------
    route_root = os.path.join(base, "app", "(routes)", "product", feature_name)
    ensure_dir(route_root)

    page_file = os.path.join(route_root, "page.tsx")

    safe_write(page_file, f"""import {{ {pascal}Page }} from "@/features/{feature_name}";

export default function Page() {{
  return <{pascal}Page />;
}}
""")

    print(f"🚀 Feature '{feature_name}' created successfully with routes + full structure!")

# -----------------------
# ENTRY
# -----------------------

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Usage: python3 create_feature.py <feature-name>")
    else:
        create_feature(sys.argv[1])