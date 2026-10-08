"""Portable local server: Windows may otherwise serve .mjs as text/plain."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.mjs':'text/javascript','.json':'application/json','.md':'text/plain; charset=utf-8'}
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(Path(__file__).resolve().parent),**kwargs)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8801)
    args=parser.parse_args()
    ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
