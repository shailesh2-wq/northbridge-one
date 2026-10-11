import os
import shutil

class Settings:
    PROJECT_NAME: str = "NorthBridge One"
    
    @property
    def DATABASE_URL(self) -> str:
        # If an explicit DATABASE_URL is configured, use it
        if os.environ.get("DATABASE_URL"):
            return os.environ.get("DATABASE_URL")
        
        # When running on Vercel Serverless Function environment
        if os.environ.get("VERCEL"):
            import tempfile
            tmp_dir = tempfile.gettempdir()
            tmp_db = os.path.join(tmp_dir, "northbridge.db")
            if not os.path.exists(tmp_db):
                # Search for bundled template database
                base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                possible_templates = [
                    os.path.join(base_dir, "northbridge.db"),
                    os.path.join(os.path.dirname(base_dir), "backend", "northbridge.db"),
                    os.path.join(os.getcwd(), "backend", "northbridge.db"),
                    os.path.join(os.getcwd(), "northbridge.db"),
                ]
                for template_path in possible_templates:
                    if os.path.exists(template_path) and os.path.getsize(template_path) > 0:
                        try:
                            shutil.copyfile(template_path, tmp_db)
                            break
                        except Exception:
                            pass
            return f"sqlite:///{tmp_db.replace(os.sep, '/')}"
        
        # Local development: use absolute path in backend folder
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        local_db = os.path.join(base_dir, "northbridge.db")
        return f"sqlite:///{local_db}"

settings = Settings()
