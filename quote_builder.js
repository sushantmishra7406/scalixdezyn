const quoteConfig = {
  services: [
    {
      id: "social-media-strategy",
      name: "Social Media Strategy",
      badge: "01",
      description: "Platform strategy, content pillars, audience direction, and growth planning.",
      defaultPlanId: "growth-strategy",
      plans: [
        { id: "starter-strategy", name: "Starter Strategy", price: 15000 },
        { id: "growth-strategy", name: "Growth Strategy", price: 35000 },
        { id: "scale-strategy", name: "Scale Strategy", price: 60000 }
      ]
    },
    {
      id: "content-creation",
      name: "Content Creation",
      badge: "02",
      description: "Static posts, carousels, creative direction, and monthly content support.",
      defaultPlanId: "growth-content",
      plans: [
        { id: "starter-content", name: "Starter Content", price: 12000 },
        { id: "growth-content", name: "Growth Content", price: 25000 },
        { id: "premium-content", name: "Premium Content", price: 45000 }
      ]
    },
    {
      id: "brand-identity",
      name: "Brand Identity",
      badge: "03",
      description: "Logo direction, visual identity system, and brand usage guidance.",
      defaultPlanId: "growth-identity",
      plans: [
        { id: "starter-identity", name: "Starter Identity", price: 20000 },
        { id: "growth-identity", name: "Growth Identity", price: 65000 },
        { id: "full-brand-system", name: "Full Brand System", price: 120000 }
      ]
    },
    {
      id: "performance-marketing",
      name: "Performance Marketing",
      badge: "04",
      description: "Campaign setup, optimization, testing, and reporting guidance. Ad spend separate.",
      defaultPlanId: "growth-performance",
      plans: [
        { id: "starter-performance", name: "Starter Performance", price: 15000 },
        { id: "growth-performance", name: "Growth Performance", price: 35000 },
        { id: "scale-performance", name: "Scale Performance", price: 60000 }
      ]
    },
    {
      id: "website-landing-pages",
      name: "Website & Landing Pages",
      badge: "05",
      description: "Conversion-focused pages, clearer offers, and stronger CTA flow.",
      defaultPlanId: "growth-web",
      plans: [
        { id: "starter-web", name: "Starter Landing Page", price: 18000 },
        { id: "growth-web", name: "Growth Web Package", price: 40000 },
        { id: "custom-web", name: "Custom Conversion Build", price: 70000 }
      ]
    },
    {
      id: "funnels-optimization",
      name: "Funnels & Optimization",
      badge: "06",
      description: "Better user journeys, improved conversion flow, and reduced drop-off.",
      defaultPlanId: "growth-funnel",
      plans: [
        { id: "starter-funnel", name: "Starter Funnel Review", price: 18000 },
        { id: "growth-funnel", name: "Growth Funnel System", price: 38000 },
        { id: "advanced-funnel", name: "Advanced Funnel Build", price: 65000 }
      ]
    },
    {
      id: "seo-organic-growth",
      name: "SEO & Organic Growth",
      badge: "07",
      description: "Organic visibility, search-focused content direction, and SEO growth support.",
      defaultPlanId: "growth-seo",
      plans: [
        { id: "starter-seo", name: "Starter SEO", price: 15000 },
        { id: "growth-seo", name: "Growth SEO", price: 30000 },
        { id: "scale-seo", name: "Scale Organic", price: 55000 }
      ]
    },
    {
      id: "analytics-strategy",
      name: "Analytics & Strategy",
      badge: "08",
      description: "Reporting interpretation, strategic insight, and smarter decision support.",
      defaultPlanId: "growth-analytics",
      plans: [
        { id: "starter-analytics", name: "Starter Insights", price: 12000 },
        { id: "growth-analytics", name: "Growth Strategy", price: 25000 },
        { id: "advanced-analytics", name: "Advanced Advisory", price: 45000 }
      ]
    },
    {
      id: "social-media-ads",
      name: "Social Media Ads",
      badge: "09",
      description: "Social ad management, targeting refinement, and campaign testing support.",
      defaultPlanId: "growth-ads",
      plans: [
        { id: "starter-ads", name: "Starter Ads", price: 15000 },
        { id: "growth-ads", name: "Growth Ads", price: 30000 },
        { id: "scale-ads", name: "Scale Ads", price: 55000 }
      ]
    }
  ]
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function getDiscountRate(serviceCount){
  if(serviceCount >= 4) return 0.15;
  if(serviceCount === 3) return 0.10;
  if(serviceCount === 2) return 0.05;
  return 0;
}

function parsePrefill(){
  const params = new URLSearchParams(window.location.search);
  return {
    service: params.get("service"),
    plan: params.get("plan")
  };
}

function getServiceById(serviceId){
  return quoteConfig.services.find(service => service.id === serviceId) || null;
}

function getPlanForService(service, planId){
  if(!service || !service.plans || !service.plans.length) return null;

  return service.plans.find(plan => plan.id === planId)
    || service.plans.find(plan => plan.name === planId)
    || service.plans.find(plan => plan.id === service.defaultPlanId)
    || service.plans[0];
}

function getSelectedPlan(serviceId){
  const service = getServiceById(serviceId);
  if(!service) return null;

  const planSelect = document.querySelector(`[data-plan][name="plan-${serviceId}"]`);
  const selectedValue = planSelect && planSelect.value ? planSelect.value : service.defaultPlanId;
  return getPlanForService(service, selectedValue);
}

function createServiceCard(service, prefill){
  const article = document.createElement("article");
  article.className = "quote-card reveal";
  article.dataset.serviceId = service.id;

  const isPrefilled = prefill.service === service.id;
  const selectedPlan = isPrefilled
    ? getPlanForService(service, prefill.plan)
    : getPlanForService(service, service.defaultPlanId);

  const planOptions = service.plans.map(plan => {
    const isSelected = selectedPlan && selectedPlan.id === plan.id ? "selected" : "";
    return `<option value="${plan.id}" ${isSelected}>${plan.name}</option>`;
  }).join("");

  article.innerHTML = `
    <input type="checkbox" name="services" value="${service.id}" ${isPrefilled ? "checked" : ""}>
    <div class="quote-card-top">
      <span class="quote-card-badge">${service.badge}</span>
      <span class="quote-card-price" data-service-price>${currency.format(selectedPlan.price)} estimate</span>
    </div>
    <h3>${service.name}</h3>
    <p>${service.description}</p>
    <div class="quote-card-plan">
      <span>Plan</span>
      <select name="plan-${service.id}" data-plan>
        ${planOptions}
      </select>
    </div>
  `;

  return article;
}

function renderCards(){
  const grid = document.querySelector("[data-quote-grid]");
  if(!grid) return;

  grid.innerHTML = "";
  const prefill = parsePrefill();
  const fragment = document.createDocumentFragment();

  quoteConfig.services.forEach(service => {
    fragment.appendChild(createServiceCard(service, prefill));
  });

  grid.appendChild(fragment);
}

function activateQuoteCards(){
  document.querySelectorAll(".quote-card.reveal").forEach(card => {
    card.classList.add("active");
  });
}

function updateSelectedStyles(){
  document.querySelectorAll(".quote-card").forEach(card => {
    const input = card.querySelector('input[name="services"]');
    card.classList.toggle("is-selected", !!(input && input.checked));
  });
}

function updateCardPrice(card){
  if(!card) return;

  const serviceId = card.dataset.serviceId;
  const selectedPlan = getSelectedPlan(serviceId);
  const priceNode = card.querySelector("[data-service-price]");

  if(priceNode && selectedPlan){
    priceNode.textContent = `${currency.format(selectedPlan.price)} estimate`;
  }
}

function updateAllCardPrices(){
  document.querySelectorAll(".quote-card").forEach(card => {
    updateCardPrice(card);
  });
}

function buildSummary(){
  const selectedIds = Array.from(
    document.querySelectorAll('input[name="services"]:checked')
  ).map(input => input.value);

  const selectedItems = selectedIds.map(serviceId => {
    const service = getServiceById(serviceId);
    const plan = getSelectedPlan(serviceId);

    if(!service || !plan) return null;

    return {
      service,
      plan,
      price: plan.price
    };
  }).filter(Boolean);

  const selectedContainer = document.querySelector("[data-selected-services]");
  const subtotalNode = document.querySelector("[data-subtotal]");
  const discountNode = document.querySelector("[data-discount]");
  const totalNode = document.querySelector("[data-total]");
  const discountLabel = document.querySelector("[data-discount-label]");
  const servicesField = document.querySelector('[name="selected_services"]');

  if(!selectedContainer || !subtotalNode || !discountNode || !totalNode || !discountLabel || !servicesField) return;

  selectedContainer.innerHTML = "";

  if(selectedItems.length === 0){
    selectedContainer.innerHTML = '<div class="quote-selected-item"><span>No services selected yet</span><span>Choose at least one</span></div>';
    subtotalNode.textContent = currency.format(0);
    discountNode.textContent = currency.format(0);
    totalNode.textContent = currency.format(0);
    discountLabel.textContent = "Bundle Discount";
    servicesField.value = "";
    return;
  }

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const discountRate = getDiscountRate(selectedItems.length);
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  selectedItems.forEach(item => {
    const itemNode = document.createElement("div");
    itemNode.className = "quote-selected-item";
    itemNode.innerHTML = `<span>${item.service.name}<br><small>${item.plan.name}</small></span><span>${currency.format(item.price)}</span>`;
    selectedContainer.appendChild(itemNode);
  });

  subtotalNode.textContent = currency.format(subtotal);
  discountNode.textContent = `- ${currency.format(discountAmount)}`;
  totalNode.textContent = currency.format(total);
  discountLabel.textContent = discountRate > 0 ? `Bundle Discount (${discountRate * 100}%)` : "Bundle Discount";
  servicesField.value = selectedItems.map(item => {
    return `${item.service.name} (${item.plan.name} - ${currency.format(item.price)})`;
  }).join(", ");
}

function toggleCardSelection(card){
  const input = card.querySelector('input[name="services"]');
  if(!input) return;

  input.checked = !input.checked;
  updateSelectedStyles();
  buildSummary();
}

function attachSelectionHandlers(){
  document.querySelectorAll(".quote-card").forEach(card => {
    const planSelect = card.querySelector("[data-plan]");

    card.addEventListener("click", event => {
      if(event.target.closest("[data-plan]")) return;
      toggleCardSelection(card);
    });

    if(planSelect){
      planSelect.addEventListener("change", () => {
        updateCardPrice(card);
        buildSummary();
      });
    }
  });
}

function attachQuoteFormHandler(){
  const form = document.querySelector(".quote-form");
  if(!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const brand = form.querySelector('[name="brand"]');
    const notes = form.querySelector('[name="notes"]');
    const selectedServices = form.querySelector('[name="selected_services"]');
    const total = document.querySelector("[data-total]");
    const button = form.querySelector("button");

    let isValid = true;

    [name, email].forEach(input => {
      if(!input || input.value.trim() === ""){
        if(input) input.style.borderColor = "#ff3b30";
        isValid = false;
      } else {
        input.style.borderColor = "rgba(255,255,255,.08)";
      }
    });

    if(selectedServices && selectedServices.value.trim() === ""){
      isValid = false;
      const serviceHint = document.querySelector("[data-service-warning]");
      if(serviceHint){
        serviceHint.textContent = "Select at least one service to continue.";
      }
    } else {
      const serviceHint = document.querySelector("[data-service-warning]");
      if(serviceHint){
        serviceHint.textContent = "";
      }
    }

    if(!isValid) return;

    const subject = `Quote Request - ${brand && brand.value ? brand.value.trim() : "Scalix Dezyn Services"}`;
    const bodyLines = [
      "Hello Scalix Dezyn,",
      "",
      "I would like a quote for the following services:",
      selectedServices && selectedServices.value ? selectedServices.value : "",
      "",
      `Estimated total shown: ${total && total.textContent ? total.textContent : ""}`,
      "",
      `Name: ${name && name.value ? name.value.trim() : ""}`,
      `Email: ${email && email.value ? email.value.trim() : ""}`,
      `Brand: ${brand && brand.value ? brand.value.trim() : ""}`,
      "",
      "Project notes:",
      notes && notes.value ? notes.value.trim() : "No extra notes provided."
    ];

    if(button){
      button.textContent = "Opening Email...";
      button.disabled = true;
    }

    window.location.href = `mailto:hello@scalixdezyn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    setTimeout(() => {
      if(button){
        button.textContent = "Get Quote on Email";
        button.disabled = false;
      }
    }, 1200);
  });
}

renderCards();
activateQuoteCards();
updateSelectedStyles();
updateAllCardPrices();
buildSummary();
attachSelectionHandlers();
attachQuoteFormHandler();
