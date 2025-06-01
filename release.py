#!/usr/bin/env python3
"""
🚀 SpinWheels Release Script
Script untuk membantu proses rilis dan deployment SpinWheels Game
"""

import os
import sys
import json
import subprocess
import shutil
from datetime import datetime
from pathlib import Path

class SpinWheelsRelease:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.version = self.get_current_version()
        
    def get_current_version(self):
        """Mendapatkan versi saat ini dari package.json"""
        try:
            with open(self.project_root / 'package.json', 'r') as f:
                package_data = json.load(f)
                return package_data.get('version', '1.0.0')
        except FileNotFoundError:
            return '1.0.0'
    
    def print_banner(self):
        """Menampilkan banner SpinWheels"""
        banner = """
🎰 ═══════════════════════════════════════════════════════════════
   ███████╗██████╗ ██╗███╗   ██╗██╗    ██╗██╗  ██╗███████╗███████╗██╗     ███████╗
   ██╔════╝██╔══██╗██║████╗  ██║██║    ██║██║  ██║██╔════╝██╔════╝██║     ██╔════╝
   ███████╗██████╔╝██║██╔██╗ ██║██║ █╗ ██║███████║█████╗  █████╗  ██║     ███████╗
   ╚════██║██╔═══╝ ██║██║╚██╗██║██║███╗██║██╔══██║██╔══╝  ██╔══╝  ██║     ╚════██║
   ███████║██║     ██║██║ ╚████║╚███╔███╔╝██║  ██║███████╗███████╗███████╗███████║
   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝
                                                                                    
                        🎮 RELEASE SCRIPT v{version} 🎮
═══════════════════════════════════════════════════════════════ 🎰
        """.format(version=self.version)
        print(banner)
    
    def check_prerequisites(self):
        """Memeriksa prerequisites untuk rilis"""
        print("🔍 Memeriksa prerequisites...")
        
        checks = []
        
        # Check Git
        try:
            subprocess.run(['git', '--version'], capture_output=True, check=True)
            checks.append(("✅ Git", "Terinstall"))
        except (subprocess.CalledProcessError, FileNotFoundError):
            checks.append(("❌ Git", "Tidak terinstall"))
        
        # Check Python
        try:
            python_version = sys.version.split()[0]
            checks.append(("✅ Python", f"v{python_version}"))
        except:
            checks.append(("❌ Python", "Error"))
        
        # Check file structure
        required_files = [
            'index.html', 'README.md', 'package.json', 
            'js/main.js', 'styles/main.css'
        ]
        
        for file in required_files:
            if (self.project_root / file).exists():
                checks.append((f"✅ {file}", "Ada"))
            else:
                checks.append((f"❌ {file}", "Tidak ada"))
        
        # Display results
        print("\n📋 Hasil Pemeriksaan:")
        for check, status in checks:
            print(f"   {check}: {status}")
        
        # Check if all critical files exist
        missing_files = [f for f in required_files if not (self.project_root / f).exists()]
        if missing_files:
            print(f"\n⚠️  File penting yang hilang: {', '.join(missing_files)}")
            return False
        
        print("\n✅ Semua prerequisites terpenuhi!")
        return True
    
    def run_tests(self):
        """Menjalankan basic tests"""
        print("\n🧪 Menjalankan tests...")
        
        # Check HTML syntax
        html_file = self.project_root / 'index.html'
        if html_file.exists():
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if '<html' in content and '</html>' in content:
                    print("   ✅ HTML syntax check passed")
                else:
                    print("   ❌ HTML syntax check failed")
                    return False
        
        # Check JavaScript modules
        js_files = list((self.project_root / 'js').glob('*.js'))
        for js_file in js_files:
            try:
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Basic syntax check
                    if 'function' in content or 'const' in content or 'let' in content:
                        print(f"   ✅ {js_file.name} syntax check passed")
                    else:
                        print(f"   ⚠️  {js_file.name} might be empty or invalid")
            except Exception as e:
                print(f"   ❌ Error reading {js_file.name}: {e}")
                return False
        
        print("   ✅ Semua tests passed!")
        return True
    
    def create_release_package(self):
        """Membuat package rilis"""
        print("\n📦 Membuat release package...")
        
        # Create release directory
        release_dir = self.project_root / f'release-v{self.version}'
        if release_dir.exists():
            shutil.rmtree(release_dir)
        release_dir.mkdir()
        
        # Files to include in release
        include_files = [
            'index.html', 'README.md', 'LICENSE', 'CHANGELOG.md',
            'package.json', 'server.py', 'start_game.bat', 'CARA_MAIN.txt'
        ]
        
        include_dirs = ['js', 'styles', 'screenshot']
        
        # Copy files
        for file in include_files:
            src = self.project_root / file
            if src.exists():
                shutil.copy2(src, release_dir / file)
                print(f"   ✅ Copied {file}")
        
        # Copy directories
        for dir_name in include_dirs:
            src_dir = self.project_root / dir_name
            if src_dir.exists():
                shutil.copytree(src_dir, release_dir / dir_name)
                print(f"   ✅ Copied {dir_name}/")
        
        # Create release info
        release_info = {
            "name": "SpinWheels Game",
            "version": self.version,
            "release_date": datetime.now().isoformat(),
            "description": "Game roda keberuntungan dengan sistem fair dan transparan",
            "files_included": include_files + [f"{d}/" for d in include_dirs]
        }
        
        with open(release_dir / 'release-info.json', 'w') as f:
            json.dump(release_info, f, indent=2)
        
        print(f"\n✅ Release package dibuat di: {release_dir}")
        return release_dir
    
    def create_zip_archive(self, release_dir):
        """Membuat ZIP archive untuk distribusi"""
        print("\n🗜️  Membuat ZIP archive...")
        
        zip_name = f"SpinWheels-v{self.version}"
        zip_path = self.project_root / f"{zip_name}.zip"
        
        # Remove existing zip
        if zip_path.exists():
            zip_path.unlink()
        
        # Create zip
        shutil.make_archive(
            str(self.project_root / zip_name),
            'zip',
            release_dir
        )
        
        print(f"   ✅ ZIP archive dibuat: {zip_path}")
        return zip_path
    
    def generate_release_notes(self):
        """Generate release notes dari CHANGELOG"""
        print("\n📝 Generating release notes...")
        
        changelog_file = self.project_root / 'CHANGELOG.md'
        if not changelog_file.exists():
            print("   ⚠️  CHANGELOG.md tidak ditemukan")
            return None
        
        with open(changelog_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract latest version notes
        lines = content.split('\n')
        release_notes = []
        in_current_version = False
        
        for line in lines:
            if line.startswith(f'## [{self.version}]'):
                in_current_version = True
                continue
            elif line.startswith('## [') and in_current_version:
                break
            elif in_current_version:
                release_notes.append(line)
        
        notes_content = '\n'.join(release_notes).strip()
        
        # Save release notes
        notes_file = self.project_root / f'release-notes-v{self.version}.md'
        with open(notes_file, 'w', encoding='utf-8') as f:
            f.write(f"# SpinWheels v{self.version} Release Notes\n\n")
            f.write(notes_content)
        
        print(f"   ✅ Release notes dibuat: {notes_file}")
        return notes_file
    
    def show_deployment_instructions(self):
        """Menampilkan instruksi deployment"""
        print("\n🚀 INSTRUKSI DEPLOYMENT:")
        print("=" * 50)
        
        instructions = """
1. 📁 UPLOAD KE GITHUB:
   git add .
   git commit -m "Release v{version}"
   git tag v{version}
   git push origin main
   git push origin v{version}

2. 🌐 DEPLOY KE HOSTING:
   
   📄 GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from branch (main)
   - Site akan tersedia di: https://username.github.io/spinwheels-game
   
   🔥 Netlify:
   - Drag & drop folder release ke netlify.com/drop
   - Atau connect GitHub repository untuk auto-deploy
   
   ⚡ Vercel:
   - Import GitHub repository di vercel.com
   - Deploy otomatis setiap push ke main branch

3. 📋 POST-DEPLOYMENT:
   - Test semua fitur di live site
   - Update README dengan live demo link
   - Share di social media
   - Submit ke game directories

4. 📊 MONITORING:
   - Setup Google Analytics (optional)
   - Monitor performance dengan Lighthouse
   - Collect user feedback
        """.format(version=self.version)
        
        print(instructions)
    
    def run_release_process(self):
        """Menjalankan proses rilis lengkap"""
        self.print_banner()
        
        print("🎯 Memulai proses rilis SpinWheels Game...")
        print(f"📦 Versi: {self.version}")
        print(f"📅 Tanggal: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Step 1: Check prerequisites
        if not self.check_prerequisites():
            print("\n❌ Prerequisites tidak terpenuhi. Proses rilis dibatalkan.")
            return False
        
        # Step 2: Run tests
        if not self.run_tests():
            print("\n❌ Tests gagal. Proses rilis dibatalkan.")
            return False
        
        # Step 3: Create release package
        release_dir = self.create_release_package()
        
        # Step 4: Create ZIP archive
        zip_path = self.create_zip_archive(release_dir)
        
        # Step 5: Generate release notes
        notes_file = self.generate_release_notes()
        
        # Step 6: Show deployment instructions
        self.show_deployment_instructions()
        
        print("\n🎉 RILIS BERHASIL DIBUAT!")
        print("=" * 50)
        print(f"📦 Release package: {release_dir}")
        print(f"🗜️  ZIP archive: {zip_path}")
        if notes_file:
            print(f"📝 Release notes: {notes_file}")
        
        print("\n✨ SpinWheels Game siap untuk di-deploy!")
        print("🔗 Ikuti instruksi deployment di atas untuk publish game Anda.")
        
        return True

def main():
    """Main function"""
    try:
        release = SpinWheelsRelease()
        success = release.run_release_process()
        
        if success:
            print("\n🎊 Selamat! Rilis SpinWheels berhasil dibuat!")
            sys.exit(0)
        else:
            print("\n💥 Rilis gagal. Periksa error di atas.")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Proses rilis dibatalkan oleh user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Error tidak terduga: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 