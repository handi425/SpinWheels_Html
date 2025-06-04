#!/usr/bin/env python3
"""
Server HTTP sederhana untuk menjalankan SpinWheels Game
Diperlukan karena game menggunakan ES6 modules yang memerlukan HTTP protocol
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Konfigurasi server
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Tambahkan header CORS untuk development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    """Memulai server HTTP dan membuka browser"""
    try:
        # Pastikan kita berada di direktori yang benar
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        
        # Buat server
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🎰 SpinWheels Server dimulai!")
            print(f"📍 URL: http://{HOST}:{PORT}")
            print(f"📁 Direktori: {os.getcwd()}")
            print(f"🌐 Membuka browser...")
            print(f"⏹️  Tekan Ctrl+C untuk menghentikan server")
            
            # Buka browser secara otomatis
            webbrowser.open(f'http://{HOST}:{PORT}')
            
            # Mulai server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Server dihentikan oleh user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} sudah digunakan!")
            print(f"💡 Coba buka http://{HOST}:{PORT} di browser")
            print(f"💡 Atau gunakan port lain: python server.py [port]")
        else:
            print(f"❌ Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error tidak terduga: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Izinkan custom port dari command line
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print("❌ Port harus berupa angka!")
            sys.exit(1)
    
    start_server() 