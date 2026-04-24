from flask import Flask, render_template, jsonify
import time

app = Flask(__name__)

# Enhanced dummy data for WiFi networks with MAC addresses and security details
WIFI_DATA = [
    {"ssid": "Home_Secure_5G", "mac": "00:0A:95:9D:68:16", "status": "Safe", "strength": "92%", "encryption": "WPA3", "channel": 36},
    {"ssid": "Free_Public_WiFi", "mac": "B4:52:7E:12:44:09", "status": "Fake", "strength": "95%", "encryption": "None (Open)", "channel": 11},
    {"ssid": "Cafe_Guest_Net", "mac": "A1:B2:C3:D4:E5:F6", "status": "Suspicious", "strength": "45%", "encryption": "WEP", "channel": 6},
    {"ssid": "Starbucks_WiFi", "mac": "CC:DD:EE:FF:11:22", "status": "Rogue", "strength": "98%", "encryption": "WPA2 (Spoofed)", "channel": 1},
    {"ssid": "Alpha_Corporate", "mac": "98:01:A2:B3:C4:D5", "status": "Safe", "strength": "60%", "encryption": "WPA2 Enterprise", "channel": 44},
    {"ssid": "Unknown_Device_AP", "mac": "DE:AD:BE:EF:00:11", "status": "Rogue", "strength": "40%", "encryption": "None", "channel": 9}
]

@app.route('/')
def home():
    """Route for the landing page."""
    return render_template('index.html')

@app.route('/scan')
def scan():
    """Route for the scanning animation page."""
    return render_template('scan.html')

@app.route('/result')
def result():
    """Route to display scanning results with safety score."""
    safe_count = sum(1 for n in WIFI_DATA if n['status'] == 'Safe')
    total_count = len(WIFI_DATA)
    safety_score = int((safe_count / total_count) * 100) if total_count > 0 else 0
    return render_template('result.html', networks=WIFI_DATA, score=safety_score)

@app.route('/about')
def about():
    """Route for the about page."""
    return render_template('about.html')

@app.route('/login')
def login():
    """Route for the login gateway."""
    return render_template('login.html')

@app.route('/subscribe')
def subscribe():
    """Route for the subscription plans."""
    return render_template('subscribe.html')

@app.route('/checkout')
def checkout():
    """Route for the simulated bank checkout page."""
    return render_template('checkout.html')

@app.route('/signup')
def signup():
    """Route for the trial signup page."""
    return render_template('signup.html')

if __name__ == '__main__':
    # Running Flask with debug mode enabled for development
    app.run(debug=True)
