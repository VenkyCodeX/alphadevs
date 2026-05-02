f = open(r'c:\Users\Asus\OneDrive\Desktop\portfolio\index.html', 'r', encoding='utf-8')
h = f.read()
f.close()

start = h.find('<div class="pricing-grid-new">')
end = h.find('<!-- ========== SERVICES')

new_grid = '''<div class="pricing-grid-new">

        <!-- 1. STANDARD PLAN -->
        <div class="pcard reveal-scale">
          <div class="pcard-top-badge">Standard Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" alt="Standard Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;10,000</span>
            <span class="pcard-amount">&#8377;7,999</span>
            <span class="pcard-gst">(+ 18% GST &#8377;1,440)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> 5 Pages Website</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website (Premium Design)</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificate</li>
              <li><i class="fa-solid fa-check"></i> 5 Free Email IDs</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Technical Support</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20the%20Standard%20Plan%20%E2%82%B97%2C999" target="_blank" class="pcard-btn">Call Now</a>
        </div>

        <!-- 2. PREMIUM PLAN -->
        <div class="pcard pcard--featured reveal-scale">
          <div class="pcard-popular">Most Popular</div>
          <div class="pcard-top-badge">Premium Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg" alt="Premium Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;20,000</span>
            <span class="pcard-amount">&#8377;13,999</span>
            <span class="pcard-gst">(+ 18% GST &#8377;2,520)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> 12 Pages Website</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website (Premium Design)</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Google Search Console Setup</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificates</li>
              <li><i class="fa-solid fa-check"></i> 10 Free Email Id</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> Woocommerce Features</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Technical Support For Website</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal For Hosting Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20the%20Premium%20Plan%20%E2%82%B913%2C999" target="_blank" class="pcard-btn">Call Now</a>
        </div>

        <!-- 3. CUSTOM PLAN -->
        <div class="pcard reveal-scale">
          <div class="pcard-top-badge pcard-top-badge--custom">Custom Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1213.jpg" alt="Custom Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;???</span>
            <span class="pcard-amount pcard-amount--custom">&#8377;????</span>
            <span class="pcard-gst">(+ 18% GST Applicable)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> Pages: According to Requirement</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Google Search Console Setup</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificates</li>
              <li><i class="fa-solid fa-check"></i> 10 Free Email Id</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> Woocommerce Features</li>
              <li><i class="fa-solid fa-check"></i> 1 Year 24/7 Free Support For Website</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20a%20Custom%20Plan" target="_blank" class="pcard-btn pcard-btn--custom">Call Now</a>
        </div>

        <!-- 4. PREMIUM DESIGN E-COMMERCE PLAN -->
        <div class="pcard reveal-scale">
          <div class="pcard-top-badge">Premium Design E-commerce Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/mobile-marketing-concept-illustration_114360-1497.jpg" alt="Premium Design E-commerce Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;30,000</span>
            <span class="pcard-amount">&#8377;21,999</span>
            <span class="pcard-gst">(+ 18% GST &#8377;3,960)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> 30 Pages Website</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> 20 Product Categories</li>
              <li><i class="fa-solid fa-check"></i> 30 Product Listing From Our Side</li>
              <li><i class="fa-solid fa-check"></i> Premium Design</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Google Search Console Setup</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificates</li>
              <li><i class="fa-solid fa-check"></i> 10 Free Email Id</li>
              <li><i class="fa-solid fa-check"></i> Premium Theme</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> Ecommerce Features</li>
              <li><i class="fa-solid fa-check"></i> Product Variation Features</li>
              <li><i class="fa-solid fa-check"></i> Auto Invoice Bill Generater Features</li>
              <li><i class="fa-solid fa-check"></i> Wallet System Features</li>
              <li><i class="fa-solid fa-check"></i> Order Notification Features</li>
              <li><i class="fa-solid fa-check"></i> OTP Verification Features</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Technical Support For Website</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal For Hosting Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20the%20Premium%20Design%20E-commerce%20Plan%20%E2%82%B921%2C999" target="_blank" class="pcard-btn">Call Now</a>
        </div>

        <!-- 5. MULTI-VENDOR BUSINESS & E-COMMERCE PLAN -->
        <div class="pcard pcard--featured reveal-scale">
          <div class="pcard-popular">Most Popular</div>
          <div class="pcard-top-badge">Multi-vendor Business &amp; E-commerce Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/ecommerce-campaign-concept-illustration_114360-5765.jpg" alt="Multi-vendor Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;60,000</span>
            <span class="pcard-amount">&#8377;50,000</span>
            <span class="pcard-gst">(+ 18% GST &#8377;9,000)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> 40 Pages Website</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> 50 Products Categories</li>
              <li><i class="fa-solid fa-check"></i> 30 Products Listing from our side</li>
              <li><i class="fa-solid fa-check"></i> Premium Design</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Google Search Console Setup</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Multi-Vendor Website</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificates</li>
              <li><i class="fa-solid fa-check"></i> 20 Free Email Id</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> Multi-Level Ecommerce Features</li>
              <li><i class="fa-solid fa-check"></i> Product Variation Features</li>
              <li><i class="fa-solid fa-check"></i> Auto Invoice Bill Generater Features</li>
              <li><i class="fa-solid fa-check"></i> Wallet System Features</li>
              <li><i class="fa-solid fa-check"></i> Order Notification Features</li>
              <li><i class="fa-solid fa-check"></i> OTP Verification Features</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Technical Support For Website</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal For Hosting Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20the%20Multi-vendor%20Business%20%26%20E-commerce%20Plan%20%E2%82%B950%2C000" target="_blank" class="pcard-btn">Call Now</a>
        </div>

        <!-- 6. CUSTOM MULTI-VENDOR BUSINESS & E-COMMERCE PLAN -->
        <div class="pcard reveal-scale">
          <div class="pcard-top-badge pcard-top-badge--custom">Custom Multi-vendor Business &amp; E-commerce Plan</div>
          <div class="pcard-illustration">
            <img src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg" alt="Custom Multi-vendor Plan" />
          </div>
          <div class="pcard-price">
            <span class="pcard-original">&#8377;???</span>
            <span class="pcard-amount pcard-amount--custom">&#8377;???</span>
            <span class="pcard-gst">(+ 18% GST Applicable)</span>
          </div>
          <div class="pcard-features">
            <h4>Features Includes</h4>
            <ul>
              <li><i class="fa-solid fa-check"></i> Pages: According to the Requirements</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Domain Name (.com .in .org)</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> ?? Products Categories</li>
              <li><i class="fa-solid fa-check"></i> ?? Products Listing from our side</li>
              <li><i class="fa-solid fa-check"></i> Premium Design</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Website</li>
              <li><i class="fa-solid fa-check"></i> Admin Access</li>
              <li><i class="fa-solid fa-check"></i> Google Search Console Setup</li>
              <li><i class="fa-solid fa-check"></i> Dynamic Multi-Vendor Website</li>
              <li><i class="fa-solid fa-check"></i> Lifetime 24/7 Free Hosting Support</li>
              <li><i class="fa-solid fa-check"></i> Unlimited Images &amp; Videos Upload</li>
              <li><i class="fa-solid fa-check"></i> Free SSL Certificates</li>
              <li><i class="fa-solid fa-check"></i> 20 Free Email Id</li>
              <li><i class="fa-solid fa-check"></i> SEO Friendly Website</li>
              <li><i class="fa-solid fa-check"></i> 100% Responsive Website</li>
              <li><i class="fa-solid fa-check"></i> Live Chat Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
              <li><i class="fa-solid fa-check"></i> Social Media Integration</li>
              <li><i class="fa-solid fa-check"></i> Call Button Integration</li>
              <li><i class="fa-solid fa-check"></i> WhatsApp Button Integration</li>
              <li><i class="fa-solid fa-check"></i> Inquiry Form</li>
              <li><i class="fa-solid fa-check"></i> Multi-Level Ecommerce Features</li>
              <li><i class="fa-solid fa-check"></i> Product Variation Features</li>
              <li><i class="fa-solid fa-check"></i> Auto Invoice Bill Generater Features</li>
              <li><i class="fa-solid fa-check"></i> Wallet System Features</li>
              <li><i class="fa-solid fa-check"></i> Order Notification Features</li>
              <li><i class="fa-solid fa-check"></i> OTP Verification Features</li>
              <li><i class="fa-solid fa-check"></i> 1 Year Free Technical Support For Website</li>
              <li><i class="fa-solid fa-check"></i> Annual Renewal For Hosting Rs.4000</li>
            </ul>
          </div>
          <a href="https://wa.me/916300003773?text=Hi%20Venkat%2C%20I%27m%20interested%20in%20a%20Custom%20Multi-vendor%20Plan" target="_blank" class="pcard-btn pcard-btn--custom">Call Now</a>
        </div>

      </div>
    </div>
  </section>

  '''

result = h[:start] + new_grid + h[end:]

f = open(r'c:\Users\Asus\OneDrive\Desktop\portfolio\index.html', 'w', encoding='utf-8')
f.write(result)
f.close()
print('Done - cards:', result.count('pcard-top-badge'))
