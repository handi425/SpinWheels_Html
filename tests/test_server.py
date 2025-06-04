import os
import threading
import http.client
import socketserver
import unittest

import server

class TestCustomHTTPRequestHandler(unittest.TestCase):
    def test_cors_headers(self):
        handler_class = server.CustomHTTPRequestHandler
        # Ensure handler serves files from server module directory
        directory = os.path.dirname(server.__file__)
        handler = lambda *args, **kwargs: handler_class(*args, directory=directory, **kwargs)

        with socketserver.TCPServer((server.HOST, 0), handler) as httpd:
            port = httpd.server_address[1]
            thread = threading.Thread(target=httpd.serve_forever)
            thread.daemon = True
            thread.start()
            try:
                conn = http.client.HTTPConnection(server.HOST, port)
                conn.request("GET", "/")
                response = conn.getresponse()
                headers = response.headers
                self.assertIn('Access-Control-Allow-Origin', headers)
                self.assertIn('Access-Control-Allow-Methods', headers)
                self.assertIn('Access-Control-Allow-Headers', headers)
            finally:
                httpd.shutdown()
                thread.join()

if __name__ == '__main__':
    unittest.main()
