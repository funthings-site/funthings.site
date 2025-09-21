// FunThings.site - Optimized JavaScript File
// Performance optimizations and lazy loading

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeToggleText(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText(newTheme);
  });
}

function updateThemeToggleText(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

// Emoji Generator
let currentEmojiCount = 1;

function initEmojiGenerator() {
  const generateBtn = document.getElementById('generate-emoji');
  const resultDiv = document.getElementById('emoji-result');
  
  if (generateBtn && resultDiv) {
    const emojis = [
      // Faces & Emotions
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮',
      '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
      '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺',
      '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
      '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈',
      '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾',
      '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
      
      // Hearts & Symbols
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '💕', '💖', '💗', '💘', '💝', '💞', '💟', '💌', '💍', '💎',
      '🔥', '💥', '💢', '💫', '⭐', '🌟', '✨', '💤', '💨', '💦',
      '🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍭', '🍬',
      
      // Food & Drinks
      '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
      '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒',
      '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐',
      '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇',
      '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪',
      '🥙', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜',
      '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘',
      '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁',
      '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰',
      '🥜', '🍯', '🥛', '🍼', '☕', '🫖', '🍵', '🧃', '🥤', '🧋',
      '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾',
      
      // Animals & Nature
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
      '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
      '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
      '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕',
      '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳',
      '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛',
      '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖',
      '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈',
      '🐈‍⬛', '🦄', '🦓', '🦌', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖',
      
      // Objects & Activities
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🪀',
      '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁',
      '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌',
      '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️', '🏋️‍♂️', '🤼‍♀️', '🤼', '🤼‍♂️',
      '🤸‍♀️', '🤸', '🤸‍♂️', '⛹️‍♀️', '⛹️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾', '🤾‍♂️',
      '🏌️‍♀️', '🏌️', '🏌️‍♂️', '🏇', '🧘‍♀️', '🧘', '🧘‍♂️', '🏄‍♀️', '🏄', '🏄‍♂️',
      '🏊‍♀️', '🏊', '🏊‍♂️', '🤽‍♀️', '🤽', '🤽‍♂️', '🚣‍♀️', '🚣', '🚣‍♂️', '🧗‍♀️',
      '🧗', '🧗‍♂️', '🚵‍♀️', '🚵', '🚵‍♂️', '🚴‍♀️', '🚴', '🚴‍♂️', '🏆', '🥇',
      '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹',
      '🤹‍♀️', '🤹‍♂️', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵',
      '🎶', '🪘', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♠️',
      '♥️', '♦️', '♣️', '♟️', '🃏', '🀄', '🎴', '🎯', '🎳', '🎮',
      '🕹️', '🎰', '🧩', '🪅', '🪆', '🎲', '♠️', '♥️', '♦️', '♣️'
    ];
    
    generateBtn.addEventListener('click', () => {
      const selectedEmojis = [];
      
      // Generate random emojis (allow duplicates for more variety)
      for (let i = 0; i < currentEmojiCount; i++) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        selectedEmojis.push(randomEmoji);
      }
      
      // Display emojis with animation
      resultDiv.innerHTML = selectedEmojis.map(emoji => 
        `<span class="emoji-item bounce-in" style="display: inline-block; margin: 5px; animation-delay: ${Math.random() * 0.5}s;">${emoji}</span>`
      ).join('');
      
      resultDiv.classList.add('fade-in-up');
      
      setTimeout(() => {
        resultDiv.classList.remove('fade-in-up');
      }, 600);
    });
  }
}

// Set emoji count from quick buttons
function setEmojiCount(count) {
  currentEmojiCount = count;
  
  // Update active button
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// Clear emojis
function clearEmojis() {
  const resultDiv = document.getElementById('emoji-result');
  if (resultDiv) {
    resultDiv.innerHTML = 'Click the button above to generate random emojis!';
    resultDiv.style.fontSize = '1rem';
  }
}


// Random Country Generator
function initCountryGenerator() {
  const generateBtn = document.getElementById('generate-country');
  const countryCard = document.querySelector('.country-card');
  const countryPlaceholder = document.getElementById('country-placeholder');
  
  if (generateBtn && countryCard && countryPlaceholder) {
    const countriesData = [
      // Africa (54 countries)
      { name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png', capital: 'Algiers', continent: 'Africa', population: '45.4M', fact: 'The largest country in Africa and the 10th largest in the world, mostly covered by the Sahara Desert.' },
      { name: 'Angola', flag: 'https://flagcdn.com/w40/ao.png', capital: 'Luanda', continent: 'Africa', population: '34.5M', fact: 'Home to the world\'s largest waterfall system - the Kalandula Falls.' },
      { name: 'Benin', flag: 'https://flagcdn.com/w40/bj.png', capital: 'Porto-Novo', continent: 'Africa', population: '12.1M', fact: 'The birthplace of voodoo and home to the world\'s largest collection of voodoo artifacts.' },
      { name: 'Botswana', flag: 'https://flagcdn.com/w40/bw.png', capital: 'Gaborone', continent: 'Africa', population: '2.4M', fact: 'Home to the world\'s largest concentration of elephants and the Okavango Delta.' },
      { name: 'Burkina Faso', flag: 'https://flagcdn.com/w40/bf.png', capital: 'Ouagadougou', continent: 'Africa', population: '21.5M', fact: 'Home to the world\'s largest elephant population in West Africa.' },
      { name: 'Burundi', flag: 'https://flagcdn.com/w40/bi.png', capital: 'Gitega', continent: 'Africa', population: '12.6M', fact: 'One of the world\'s poorest countries but has the highest population density in Africa.' },
      { name: 'Cabo Verde', flag: 'https://flagcdn.com/w40/cv.png', capital: 'Praia', continent: 'Africa', population: '556K', fact: 'An archipelago of 10 volcanic islands, known for its music and as a former pirate haven.' },
      { name: 'Cameroon', flag: 'https://flagcdn.com/w40/cm.png', capital: 'Yaoundé', continent: 'Africa', population: '27.9M', fact: 'Known as "Africa in miniature" because it has all the major climates and vegetation zones of the continent.' },
      { name: 'Central African Republic', flag: 'https://flagcdn.com/w40/cf.png', capital: 'Bangui', continent: 'Africa', population: '4.9M', fact: 'One of the world\'s least developed countries but rich in diamonds and gold.' },
      { name: 'Chad', flag: 'https://flagcdn.com/w40/td.png', capital: 'N\'Djamena', continent: 'Africa', population: '17.2M', fact: 'Home to the Ennedi Plateau, one of the most beautiful and remote places on Earth.' },
      { name: 'Comoros', flag: 'https://flagcdn.com/w40/km.png', capital: 'Moroni', continent: 'Africa', population: '888K', fact: 'An archipelago of three main islands, known as the "Perfume Islands" due to their production of ylang-ylang.' },
      { name: 'Democratic Republic of the Congo', flag: 'https://flagcdn.com/w40/cd.png', capital: 'Kinshasa', continent: 'Africa', population: '95.9M', fact: 'Home to the world\'s second-largest rainforest and the world\'s largest population of bonobos.' },
      { name: 'Republic of the Congo', flag: 'https://flagcdn.com/w40/cg.png', capital: 'Brazzaville', continent: 'Africa', population: '5.7M', fact: 'One of the most forested countries in the world, with 65% of its land covered by rainforest.' },
      { name: 'Djibouti', flag: 'https://flagcdn.com/w40/dj.png', capital: 'Djibouti', continent: 'Africa', population: '1.0M', fact: 'One of the hottest countries on Earth, with temperatures regularly exceeding 45°C (113°F).' },
      { name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png', capital: 'Cairo', continent: 'Africa', population: '105.2M', fact: 'Home to the Great Pyramid of Giza, the only remaining wonder of the ancient world, and the longest river in the world - the Nile.' },
      { name: 'Equatorial Guinea', flag: 'https://flagcdn.com/w40/gq.png', capital: 'Malabo', continent: 'Africa', population: '1.5M', fact: 'The only African country where Spanish is an official language.' },
      { name: 'Eritrea', flag: 'https://flagcdn.com/w40/er.png', capital: 'Asmara', continent: 'Africa', population: '3.6M', fact: 'Known as the "North Korea of Africa" due to its isolation and authoritarian government.' },
      { name: 'Eswatini', flag: 'https://flagcdn.com/w40/sz.png', capital: 'Mbabane', continent: 'Africa', population: '1.2M', fact: 'One of the last absolute monarchies in the world and home to the world\'s largest traditional dance.' },
      { name: 'Ethiopia', flag: 'https://flagcdn.com/w40/et.png', capital: 'Addis Ababa', continent: 'Africa', population: '120.3M', fact: 'The only African country that was never colonized and home to the oldest human fossils.' },
      { name: 'Gabon', flag: 'https://flagcdn.com/w40/ga.png', capital: 'Libreville', continent: 'Africa', population: '2.3M', fact: 'Home to 80% of the world\'s gorilla population and one of the most forested countries on Earth.' },
      { name: 'Gambia', flag: 'https://flagcdn.com/w40/gm.png', capital: 'Banjul', continent: 'Africa', population: '2.5M', fact: 'The smallest country in mainland Africa, surrounded by Senegal on three sides.' },
      { name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png', capital: 'Accra', continent: 'Africa', population: '32.8M', fact: 'The first African country to gain independence from colonial rule in 1957 and home to the world\'s largest artificial lake.' },
      { name: 'Guinea', flag: 'https://flagcdn.com/w40/gn.png', capital: 'Conakry', continent: 'Africa', population: '13.1M', fact: 'Home to the world\'s largest bauxite reserves and the source of the Niger River.' },
      { name: 'Guinea-Bissau', flag: 'https://flagcdn.com/w40/gw.png', capital: 'Bissau', continent: 'Africa', population: '2.0M', fact: 'One of the world\'s poorest countries but rich in cashew nuts and fish.' },
      { name: 'Ivory Coast', flag: 'https://flagcdn.com/w40/ci.png', capital: 'Yamoussoukro', continent: 'Africa', population: '27.5M', fact: 'The world\'s largest producer of cocoa beans and home to the world\'s largest basilica.' },
      { name: 'Kenya', flag: 'https://flagcdn.com/w40/ke.png', capital: 'Nairobi', continent: 'Africa', population: '54.0M', fact: 'Home to the Great Migration, the largest animal migration on Earth, and the birthplace of humanity.' },
      { name: 'Lesotho', flag: 'https://flagcdn.com/w40/ls.png', capital: 'Maseru', continent: 'Africa', population: '2.2M', fact: 'The only country in the world that lies entirely above 1,000 meters in elevation.' },
      { name: 'Liberia', flag: 'https://flagcdn.com/w40/lr.png', capital: 'Monrovia', continent: 'Africa', population: '5.2M', fact: 'Founded by freed American slaves and home to the world\'s largest rubber plantation.' },
      { name: 'Libya', flag: 'https://flagcdn.com/w40/ly.png', capital: 'Tripoli', continent: 'Africa', population: '7.0M', fact: 'Home to the world\'s largest oil reserves in Africa and the world\'s largest desert.' },
      { name: 'Madagascar', flag: 'https://flagcdn.com/w40/mg.png', capital: 'Antananarivo', continent: 'Africa', population: '29.2M', fact: 'Home to 5% of the world\'s plant and animal species, with 90% found nowhere else on Earth.' },
      { name: 'Malawi', flag: 'https://flagcdn.com/w40/mw.png', capital: 'Lilongwe', continent: 'Africa', population: '20.4M', fact: 'Known as the "Warm Heart of Africa" and home to the world\'s largest lake by volume.' },
      { name: 'Mali', flag: 'https://flagcdn.com/w40/ml.png', capital: 'Bamako', continent: 'Africa', population: '21.9M', fact: 'Home to the ancient city of Timbuktu and the world\'s largest mud-brick building.' },
      { name: 'Mauritania', flag: 'https://flagcdn.com/w40/mr.png', capital: 'Nouakchott', continent: 'Africa', population: '4.9M', fact: 'The last country in the world to abolish slavery and home to the world\'s largest iron ore deposits.' },
      { name: 'Mauritius', flag: 'https://flagcdn.com/w40/mu.png', capital: 'Port Louis', continent: 'Africa', population: '1.3M', fact: 'The only country in the world where the dodo bird once lived and home to the world\'s most diverse population.' },
      { name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png', capital: 'Rabat', continent: 'Africa', population: '37.8M', fact: 'Home to the world\'s largest desert and the world\'s oldest university.' },
      { name: 'Mozambique', flag: 'https://flagcdn.com/w40/mz.png', capital: 'Maputo', continent: 'Africa', population: '33.9M', fact: 'Home to the world\'s largest population of dugongs and the world\'s longest beach.' },
      { name: 'Namibia', flag: 'https://flagcdn.com/w40/na.png', capital: 'Windhoek', continent: 'Africa', population: '2.6M', fact: 'The second least densely populated country in the world and home to the world\'s largest meteorite.' },
      { name: 'Niger', flag: 'https://flagcdn.com/w40/ne.png', capital: 'Niamey', continent: 'Africa', population: '26.2M', fact: 'The world\'s largest producer of uranium and home to the world\'s largest protected area.' },
      { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png', capital: 'Abuja', continent: 'Africa', population: '223.8M', fact: 'The most populous country in Africa and home to the world\'s largest film industry (Nollywood).' },
      { name: 'Rwanda', flag: 'https://flagcdn.com/w40/rw.png', capital: 'Kigali', continent: 'Africa', population: '13.5M', fact: 'The cleanest country in Africa and home to the world\'s largest population of mountain gorillas.' },
      { name: 'São Tomé and Príncipe', flag: 'https://flagcdn.com/w40/st.png', capital: 'São Tomé', continent: 'Africa', population: '223K', fact: 'The second smallest African country and home to the world\'s largest population of endemic birds.' },
      { name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png', capital: 'Dakar', continent: 'Africa', population: '17.7M', fact: 'The westernmost point of Africa and home to the world\'s largest statue of a woman.' },
      { name: 'Seychelles', flag: 'https://flagcdn.com/w40/sc.png', capital: 'Victoria', continent: 'Africa', population: '99K', fact: 'The smallest African country and home to the world\'s largest seed and the world\'s smallest capital city.' },
      { name: 'Sierra Leone', flag: 'https://flagcdn.com/w40/sl.png', capital: 'Freetown', continent: 'Africa', population: '8.2M', fact: 'Founded by freed American slaves and home to the world\'s largest diamond ever found.' },
      { name: 'Somalia', flag: 'https://flagcdn.com/w40/so.png', capital: 'Mogadishu', continent: 'Africa', population: '16.9M', fact: 'The longest coastline in Africa and home to the world\'s largest population of camels.' },
      { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png', capital: 'Cape Town', continent: 'Africa', population: '60.4M', fact: 'The only country in the world with three capital cities and home to the world\'s largest diamond.' },
      { name: 'South Sudan', flag: 'https://flagcdn.com/w40/ss.png', capital: 'Juba', continent: 'Africa', population: '11.4M', fact: 'The world\'s newest country (2011) and home to the world\'s largest swamp.' },
      { name: 'Sudan', flag: 'https://flagcdn.com/w40/sd.png', capital: 'Khartoum', continent: 'Africa', population: '46.9M', fact: 'The third largest country in Africa and home to the world\'s largest collection of pyramids.' },
      { name: 'Tanzania', flag: 'https://flagcdn.com/w40/tz.png', capital: 'Dodoma', continent: 'Africa', population: '62.1M', fact: 'Home to Mount Kilimanjaro, the highest mountain in Africa, and the world\'s largest population of lions.' },
      { name: 'Togo', flag: 'https://flagcdn.com/w40/tg.png', capital: 'Lomé', continent: 'Africa', population: '8.5M', fact: 'The world\'s largest producer of phosphate and home to the world\'s largest voodoo market.' },
      { name: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png', capital: 'Tunis', continent: 'Africa', population: '12.0M', fact: 'The northernmost country in Africa and home to the world\'s largest collection of Roman mosaics.' },
      { name: 'Uganda', flag: 'https://flagcdn.com/w40/ug.png', capital: 'Kampala', continent: 'Africa', population: '47.2M', fact: 'Home to the world\'s largest population of mountain gorillas and the world\'s youngest population.' },
      { name: 'Zambia', flag: 'https://flagcdn.com/w40/zm.png', capital: 'Lusaka', continent: 'Africa', population: '19.5M', fact: 'Home to Victoria Falls, one of the Seven Natural Wonders of the World, and the world\'s largest copper reserves.' },
      { name: 'Zimbabwe', flag: 'https://flagcdn.com/w40/zw.png', capital: 'Harare', continent: 'Africa', population: '15.1M', fact: 'Home to the world\'s largest waterfall by volume and the world\'s largest man-made lake.' },
      
      // Asia (49 countries)
      { name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png', capital: 'Kabul', continent: 'Asia', population: '40.1M', fact: 'Known as the "Graveyard of Empires" due to its challenging terrain and history of resisting foreign invasions.' },
      { name: 'Armenia', flag: 'https://flagcdn.com/w40/am.png', capital: 'Yerevan', continent: 'Asia', population: '2.9M', fact: 'One of the oldest wine-producing regions in the world, with evidence of winemaking dating back 6,100 years.' },
      { name: 'Azerbaijan', flag: 'https://flagcdn.com/w40/az.png', capital: 'Baku', continent: 'Asia', population: '10.1M', fact: 'Known as the "Land of Fire" due to its natural gas reserves that have been burning for thousands of years.' },
      { name: 'Bahrain', flag: 'https://flagcdn.com/w40/bh.png', capital: 'Manama', continent: 'Asia', population: '1.7M', fact: 'The smallest Arab country and home to the world\'s largest underwater theme park.' },
      { name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png', capital: 'Dhaka', continent: 'Asia', population: '167.9M', fact: 'The most densely populated large country in the world, with over 1,000 people per square kilometer.' },
      { name: 'Bhutan', flag: 'https://flagcdn.com/w40/bt.png', capital: 'Thimphu', continent: 'Asia', population: '775K', fact: 'The only country in the world that measures Gross National Happiness instead of GDP.' },
      { name: 'Brunei', flag: 'https://flagcdn.com/w40/bn.png', capital: 'Bandar Seri Begawan', continent: 'Asia', population: '437K', fact: 'One of the richest countries in the world due to its oil and gas reserves.' },
      { name: 'Cambodia', flag: 'https://flagcdn.com/w40/kh.png', capital: 'Phnom Penh', continent: 'Asia', population: '16.9M', fact: 'Home to Angkor Wat, the largest religious monument in the world, originally built as a Hindu temple.' },
      { name: 'China', flag: 'https://flagcdn.com/w40/cn.png', capital: 'Beijing', continent: 'Asia', population: '1.4B', fact: 'Home to the Great Wall of China, which is not visible from space but is the longest man-made structure on Earth.' },
      { name: 'Cyprus', flag: 'https://flagcdn.com/w40/cy.png', capital: 'Nicosia', continent: 'Asia', population: '1.2M', fact: 'The birthplace of Aphrodite, the Greek goddess of love, and home to the world\'s oldest wine label.' },
      { name: 'Georgia', flag: 'https://flagcdn.com/w40/ge.png', capital: 'Tbilisi', continent: 'Asia', population: '3.7M', fact: 'Considered the birthplace of wine, with evidence of winemaking dating back 8,000 years.' },
      { name: 'India', flag: 'https://flagcdn.com/w40/in.png', capital: 'New Delhi', continent: 'Asia', population: '1.4B', fact: 'Home to the world\'s largest democracy and the Taj Mahal, one of the Seven Wonders of the World.' },
      { name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png', capital: 'Jakarta', continent: 'Asia', population: '275.8M', fact: 'The world\'s largest archipelago with over 17,000 islands and home to the world\'s largest Muslim population.' },
      { name: 'Iran', flag: 'https://flagcdn.com/w40/ir.png', capital: 'Tehran', continent: 'Asia', population: '85.0M', fact: 'Home to the world\'s largest collection of Persian carpets and the world\'s oldest continuously inhabited city.' },
      { name: 'Iraq', flag: 'https://flagcdn.com/w40/iq.png', capital: 'Baghdad', continent: 'Asia', population: '42.2M', fact: 'The birthplace of writing and home to the world\'s oldest known civilization.' },
      { name: 'Israel', flag: 'https://flagcdn.com/w40/il.png', capital: 'Jerusalem', continent: 'Asia', population: '9.3M', fact: 'The only country in the world where the population is majority Jewish and home to the Dead Sea.' },
      { name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png', capital: 'Tokyo', continent: 'Asia', population: '125.8M', fact: 'Home to the world\'s oldest company (founded in 578 AD) and the world\'s busiest pedestrian crossing.' },
      { name: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png', capital: 'Amman', continent: 'Asia', population: '11.2M', fact: 'Home to Petra, one of the Seven Wonders of the World, and the world\'s lowest point on land.' },
      { name: 'Kazakhstan', flag: 'https://flagcdn.com/w40/kz.png', capital: 'Nur-Sultan', continent: 'Asia', population: '19.4M', fact: 'The world\'s largest landlocked country and home to the world\'s largest space launch facility.' },
      { name: 'Kuwait', flag: 'https://flagcdn.com/w40/kw.png', capital: 'Kuwait City', continent: 'Asia', population: '4.3M', fact: 'One of the world\'s richest countries per capita and home to the world\'s tallest flagpole.' },
      { name: 'Kyrgyzstan', flag: 'https://flagcdn.com/w40/kg.png', capital: 'Bishkek', continent: 'Asia', population: '6.7M', fact: 'Known as the "Switzerland of Central Asia" and home to the world\'s largest walnut forest.' },
      { name: 'Laos', flag: 'https://flagcdn.com/w40/la.png', capital: 'Vientiane', continent: 'Asia', population: '7.5M', fact: 'The only landlocked country in Southeast Asia and home to the world\'s largest collection of unexploded bombs.' },
      { name: 'Lebanon', flag: 'https://flagcdn.com/w40/lb.png', capital: 'Beirut', continent: 'Asia', population: '6.8M', fact: 'Home to the world\'s oldest continuously inhabited city and the world\'s largest collection of Phoenician artifacts.' },
      { name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png', capital: 'Kuala Lumpur', continent: 'Asia', population: '33.9M', fact: 'Home to the world\'s tallest twin towers and the world\'s largest flower.' },
      { name: 'Maldives', flag: 'https://flagcdn.com/w40/mv.png', capital: 'Malé', continent: 'Asia', population: '540K', fact: 'The world\'s lowest country and home to the world\'s largest collection of coral reefs.' },
      { name: 'Mongolia', flag: 'https://flagcdn.com/w40/mn.png', capital: 'Ulaanbaatar', continent: 'Asia', population: '3.4M', fact: 'The world\'s least densely populated country and home to the world\'s largest collection of dinosaur fossils.' },
      { name: 'Myanmar (Burma)', flag: 'https://flagcdn.com/w40/mm.png', capital: 'Naypyidaw', continent: 'Asia', population: '55.0M', fact: 'Home to the world\'s largest collection of Buddhist temples and the world\'s largest bell.' },
      { name: 'Nepal', flag: 'https://flagcdn.com/w40/np.png', capital: 'Kathmandu', continent: 'Asia', population: '30.0M', fact: 'Home to Mount Everest, the world\'s highest mountain, and the world\'s only living goddess.' },
      { name: 'North Korea', flag: 'https://flagcdn.com/w40/kp.png', capital: 'Pyongyang', continent: 'Asia', population: '25.9M', fact: 'The world\'s most isolated country and home to the world\'s largest stadium.' },
      { name: 'Oman', flag: 'https://flagcdn.com/w40/om.png', capital: 'Muscat', continent: 'Asia', population: '5.2M', fact: 'The world\'s oldest independent Arab state and home to the world\'s largest frankincense forest.' },
      { name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png', capital: 'Islamabad', continent: 'Asia', population: '231.4M', fact: 'Home to the world\'s second-highest mountain (K2) and the world\'s largest irrigation system.' },
      { name: 'Palestine', flag: 'https://flagcdn.com/w40/ps.png', capital: 'Ramallah', continent: 'Asia', population: '5.2M', fact: 'Home to the world\'s oldest continuously inhabited city and the world\'s most contested territory.' },
      { name: 'Philippines', flag: 'https://flagcdn.com/w40/ph.png', capital: 'Manila', continent: 'Asia', population: '111.0M', fact: 'The only country in the world with a flag that changes design when at war.' },
      { name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png', capital: 'Doha', continent: 'Asia', population: '2.9M', fact: 'The world\'s richest country per capita and home to the world\'s largest collection of Islamic art.' },
      { name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png', capital: 'Riyadh', continent: 'Asia', population: '35.9M', fact: 'Home to the world\'s largest sand desert and the world\'s largest oil reserves.' },
      { name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png', capital: 'Singapore', continent: 'Asia', population: '5.9M', fact: 'The world\'s only city-state and home to the world\'s largest collection of orchids.' },
      { name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png', capital: 'Seoul', continent: 'Asia', population: '51.8M', fact: 'Home to the world\'s fastest internet speeds and the world\'s largest indoor theme park.' },
      { name: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png', capital: 'Colombo', continent: 'Asia', population: '22.2M', fact: 'Home to the world\'s largest collection of ancient Buddhist texts and the world\'s largest sapphire.' },
      { name: 'Syria', flag: 'https://flagcdn.com/w40/sy.png', capital: 'Damascus', continent: 'Asia', population: '18.3M', fact: 'Home to the world\'s oldest continuously inhabited capital city and the world\'s largest collection of ancient mosaics.' },
      { name: 'Taiwan', flag: 'https://flagcdn.com/w40/tw.png', capital: 'Taipei', continent: 'Asia', population: '23.9M', fact: 'Home to the world\'s largest collection of Chinese art and the world\'s tallest building made of bamboo.' },
      { name: 'Tajikistan', flag: 'https://flagcdn.com/w40/tj.png', capital: 'Dushanbe', continent: 'Asia', population: '9.8M', fact: 'The world\'s most mountainous country and home to the world\'s largest collection of ancient manuscripts.' },
      { name: 'Thailand', flag: 'https://flagcdn.com/w40/th.png', capital: 'Bangkok', continent: 'Asia', population: '70.0M', fact: 'Home to the world\'s largest gold Buddha and the world\'s longest snake.' },
      { name: 'Timor-Leste', flag: 'https://flagcdn.com/w40/tl.png', capital: 'Dili', continent: 'Asia', population: '1.3M', fact: 'The world\'s newest country in Asia and home to the world\'s largest collection of coral reefs.' },
      { name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png', capital: 'Ankara', continent: 'Asia', population: '84.8M', fact: 'The only country in the world that spans two continents and home to the world\'s oldest known temple.' },
      { name: 'Turkmenistan', flag: 'https://flagcdn.com/w40/tm.png', capital: 'Ashgabat', continent: 'Asia', population: '6.1M', fact: 'Home to the world\'s largest collection of white marble buildings and the world\'s largest gas field.' },
      { name: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png', capital: 'Abu Dhabi', continent: 'Asia', population: '10.1M', fact: 'Home to the world\'s tallest building and the world\'s largest collection of luxury cars.' },
      { name: 'Uzbekistan', flag: 'https://flagcdn.com/w40/uz.png', capital: 'Tashkent', continent: 'Asia', population: '34.9M', fact: 'The world\'s only double landlocked country and home to the world\'s largest collection of Islamic architecture.' },
      { name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png', capital: 'Hanoi', continent: 'Asia', population: '98.2M', fact: 'Home to the world\'s largest cave and the world\'s most expensive coffee.' },
      { name: 'Yemen', flag: 'https://flagcdn.com/w40/ye.png', capital: 'Sana\'a', continent: 'Asia', population: '30.5M', fact: 'Home to the world\'s oldest skyscrapers and the world\'s largest collection of ancient manuscripts.' },
      
      // Europe (44 countries)
      { name: 'Albania', flag: 'https://flagcdn.com/w40/al.png', capital: 'Tirana', continent: 'Europe', population: '2.8M', fact: 'Has more than 750,000 bunkers built during the communist era - more than any other country in the world.' },
      { name: 'Andorra', flag: 'https://flagcdn.com/w40/ad.png', capital: 'Andorra la Vella', continent: 'Europe', population: '77K', fact: 'The only country in the world where the official language is Catalan and has no army.' },
      { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png', capital: 'Vienna', continent: 'Europe', population: '9.0M', fact: 'The birthplace of classical music legends Mozart, Beethoven, and Strauss, and home to the world\'s oldest zoo.' },
      { name: 'Belarus', flag: 'https://flagcdn.com/w40/by.png', capital: 'Minsk', continent: 'Europe', population: '9.4M', fact: 'Known as the "Lungs of Europe" due to its extensive forests covering 40% of the country.' },
      { name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png', capital: 'Brussels', continent: 'Europe', population: '11.6M', fact: 'Produces more chocolate per capita than any other country and is home to over 2,000 chocolate shops.' },
      { name: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/w40/ba.png', capital: 'Sarajevo', continent: 'Europe', population: '3.3M', fact: 'Home to the world\'s oldest pyramid - the Bosnian Pyramid of the Sun.' },
      { name: 'Bulgaria', flag: 'https://flagcdn.com/w40/bg.png', capital: 'Sofia', continent: 'Europe', population: '6.9M', fact: 'The only country in Europe where the head nod means "no" and head shake means "yes".' },
      { name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png', capital: 'Zagreb', continent: 'Europe', population: '4.0M', fact: 'Home to the smallest town in the world - Hum, with only 30 inhabitants and a population that varies between 17-23 people.' },
      { name: 'Czechia (Czech Republic)', flag: 'https://flagcdn.com/w40/cz.png', capital: 'Prague', continent: 'Europe', population: '10.7M', fact: 'Consumes more beer per capita than any other country in the world, with an average of 143 liters per person annually.' },
      { name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png', capital: 'Copenhagen', continent: 'Europe', population: '5.8M', fact: 'Consistently ranked as one of the happiest countries in the world and home to the oldest monarchy in Europe.' },
      { name: 'Estonia', flag: 'https://flagcdn.com/w40/ee.png', capital: 'Tallinn', continent: 'Europe', population: '1.3M', fact: 'The most digitally advanced country in the world, where 99% of government services are available online.' },
      { name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png', capital: 'Helsinki', continent: 'Europe', population: '5.5M', fact: 'Has more saunas than cars, with over 3 million saunas for a population of 5.5 million people.' },
      { name: 'France', flag: 'https://flagcdn.com/w40/fr.png', capital: 'Paris', continent: 'Europe', population: '67.8M', fact: 'The most visited country in the world, with over 89 million tourists annually, and home to the Eiffel Tower.' },
      { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', capital: 'Berlin', continent: 'Europe', population: '83.2M', fact: 'Home to the world\'s largest beer festival (Oktoberfest) and has over 1,300 breweries.' },
      { name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png', capital: 'Athens', continent: 'Europe', population: '10.7M', fact: 'Has more archaeological museums than any other country and is home to over 6,000 islands.' },
      { name: 'Hungary', flag: 'https://flagcdn.com/w40/hu.png', capital: 'Budapest', continent: 'Europe', population: '9.7M', fact: 'Home to the world\'s largest thermal lake and the world\'s largest collection of thermal baths.' },
      { name: 'Iceland', flag: 'https://flagcdn.com/w40/is.png', capital: 'Reykjavik', continent: 'Europe', population: '372K', fact: 'The most sparsely populated country in Europe and home to the world\'s oldest parliament.' },
      { name: 'Ireland', flag: 'https://flagcdn.com/w40/ie.png', capital: 'Dublin', continent: 'Europe', population: '5.0M', fact: 'Known as the "Emerald Isle" and home to more sheep than people.' },
      { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png', capital: 'Rome', continent: 'Europe', population: '60.4M', fact: 'Home to more UNESCO World Heritage Sites than any other country and the birthplace of the Renaissance.' },
      { name: 'Kosovo', flag: 'https://flagcdn.com/w40/xk.png', capital: 'Pristina', continent: 'Europe', population: '1.9M', fact: 'The world\'s newest country in Europe and home to the world\'s largest collection of Serbian Orthodox monasteries.' },
      { name: 'Latvia', flag: 'https://flagcdn.com/w40/lv.png', capital: 'Riga', continent: 'Europe', population: '1.9M', fact: 'Home to the world\'s largest collection of Art Nouveau buildings and the world\'s fastest internet speeds.' },
      { name: 'Liechtenstein', flag: 'https://flagcdn.com/w40/li.png', capital: 'Vaduz', continent: 'Europe', population: '39K', fact: 'The world\'s smallest country with a coastline and home to the world\'s largest collection of postage stamps.' },
      { name: 'Lithuania', flag: 'https://flagcdn.com/w40/lt.png', capital: 'Vilnius', continent: 'Europe', population: '2.8M', fact: 'The world\'s largest country by area that was once part of the Soviet Union and home to the world\'s largest collection of amber.' },
      { name: 'Luxembourg', flag: 'https://flagcdn.com/w40/lu.png', capital: 'Luxembourg City', continent: 'Europe', population: '634K', fact: 'The world\'s richest country per capita and home to the world\'s largest collection of medieval castles.' },
      { name: 'Malta', flag: 'https://flagcdn.com/w40/mt.png', capital: 'Valletta', continent: 'Europe', population: '525K', fact: 'The world\'s most densely populated country and home to the world\'s largest collection of prehistoric temples.' },
      { name: 'Moldova', flag: 'https://flagcdn.com/w40/md.png', capital: 'Chișinău', continent: 'Europe', population: '2.6M', fact: 'The world\'s least visited country and home to the world\'s largest collection of wine cellars.' },
      { name: 'Monaco', flag: 'https://flagcdn.com/w40/mc.png', capital: 'Monaco', continent: 'Europe', population: '39K', fact: 'The world\'s second smallest country and home to the world\'s most expensive real estate.' },
      { name: 'Montenegro', flag: 'https://flagcdn.com/w40/me.png', capital: 'Podgorica', continent: 'Europe', population: '628K', fact: 'The world\'s newest country in Europe and home to the world\'s largest collection of Orthodox monasteries.' },
      { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png', capital: 'Amsterdam', continent: 'Europe', population: '17.4M', fact: 'The most densely populated country in Europe and home to more bicycles than people.' },
      { name: 'North Macedonia', flag: 'https://flagcdn.com/w40/mk.png', capital: 'Skopje', continent: 'Europe', population: '2.1M', fact: 'The world\'s newest country in Europe and home to the world\'s largest collection of Byzantine churches.' },
      { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png', capital: 'Oslo', continent: 'Europe', population: '5.4M', fact: 'The happiest country in the world and home to the world\'s longest road tunnel.' },
      { name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png', capital: 'Warsaw', continent: 'Europe', population: '37.8M', fact: 'Home to the world\'s largest castle and the birthplace of the world\'s first constitution.' },
      { name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png', capital: 'Lisbon', continent: 'Europe', population: '10.3M', fact: 'The oldest country in Europe with the same borders since 1139 and home to the world\'s longest bridge.' },
      { name: 'Romania', flag: 'https://flagcdn.com/w40/ro.png', capital: 'Bucharest', continent: 'Europe', population: '19.1M', fact: 'Home to the world\'s heaviest building and the world\'s largest population of brown bears in Europe.' },
      { name: 'Russia', flag: 'https://flagcdn.com/w40/ru.png', capital: 'Moscow', continent: 'Europe', population: '146.2M', fact: 'The largest country in the world, spanning 11 time zones, and home to the world\'s deepest lake.' },
      { name: 'San Marino', flag: 'https://flagcdn.com/w40/sm.png', capital: 'San Marino', continent: 'Europe', population: '34K', fact: 'The world\'s oldest republic and home to the world\'s smallest population.' },
      { name: 'Serbia', flag: 'https://flagcdn.com/w40/rs.png', capital: 'Belgrade', continent: 'Europe', population: '6.9M', fact: 'The world\'s largest producer of raspberries and home to the world\'s largest collection of medieval monasteries.' },
      { name: 'Slovakia', flag: 'https://flagcdn.com/w40/sk.png', capital: 'Bratislava', continent: 'Europe', population: '5.5M', fact: 'The world\'s largest producer of cars per capita and home to the world\'s largest collection of castles.' },
      { name: 'Slovenia', flag: 'https://flagcdn.com/w40/si.png', capital: 'Ljubljana', continent: 'Europe', population: '2.1M', fact: 'The world\'s most forested country and home to the world\'s largest collection of caves.' },
      { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png', capital: 'Madrid', continent: 'Europe', population: '47.4M', fact: 'Home to the world\'s second-most spoken language and the world\'s largest tomato fight festival.' },
      { name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png', capital: 'Stockholm', continent: 'Europe', population: '10.4M', fact: 'Home to the world\'s largest furniture retailer (IKEA) and the world\'s longest art gallery.' },
      { name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png', capital: 'Bern', continent: 'Europe', population: '8.7M', fact: 'The only country in the world with a square flag and home to the world\'s longest railway tunnel.' },
      { name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png', capital: 'Kiev', continent: 'Europe', population: '43.8M', fact: 'The largest country entirely in Europe and home to the world\'s deepest metro station.' },
      { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', capital: 'London', continent: 'Europe', population: '67.9M', fact: 'Home to the world\'s oldest underground railway and the world\'s largest collection of human remains.' },
      { name: 'Vatican City (Holy See)', flag: 'https://flagcdn.com/w40/va.png', capital: 'Vatican City', continent: 'Europe', population: '825', fact: 'The world\'s smallest country and home to the world\'s largest collection of art and artifacts.' },
      
      // North America (23 countries)
      { name: 'Antigua and Barbuda', flag: 'https://flagcdn.com/w40/ag.png', capital: 'Saint John\'s', continent: 'North America', population: '98K', fact: 'Has 365 beaches - one for every day of the year!' },
      { name: 'Bahamas', flag: 'https://flagcdn.com/w40/bs.png', capital: 'Nassau', continent: 'North America', population: '393K', fact: 'Made up of 700 islands and cays, with only 30 inhabited.' },
      { name: 'Barbados', flag: 'https://flagcdn.com/w40/bb.png', capital: 'Bridgetown', continent: 'North America', population: '287K', fact: 'The only country in the world that has a single UNESCO World Heritage Site - Historic Bridgetown.' },
      { name: 'Belize', flag: 'https://flagcdn.com/w40/bz.png', capital: 'Belmopan', continent: 'North America', population: '397K', fact: 'Home to the world\'s second-largest barrier reef and the only country with jaguars in the wild.' },
      { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', capital: 'Ottawa', continent: 'North America', population: '38.2M', fact: 'Has the longest coastline in the world at 202,080 kilometers and more lakes than all other countries combined.' },
      { name: 'Costa Rica', flag: 'https://flagcdn.com/w40/cr.png', capital: 'San José', continent: 'North America', population: '5.1M', fact: 'Home to 5% of the world\'s biodiversity despite covering only 0.03% of the Earth\'s surface.' },
      { name: 'Cuba', flag: 'https://flagcdn.com/w40/cu.png', capital: 'Havana', continent: 'North America', population: '11.3M', fact: 'Has the highest doctor-to-patient ratio in the world and exports more doctors than any other country.' },
      { name: 'Dominica', flag: 'https://flagcdn.com/w40/dm.png', capital: 'Roseau', continent: 'North America', population: '72K', fact: 'Known as the "Nature Island" and home to the world\'s second-largest hot spring.' },
      { name: 'Dominican Republic', flag: 'https://flagcdn.com/w40/do.png', capital: 'Santo Domingo', continent: 'North America', population: '10.8M', fact: 'Home to the first cathedral, university, and hospital in the Americas.' },
      { name: 'El Salvador', flag: 'https://flagcdn.com/w40/sv.png', capital: 'San Salvador', continent: 'North America', population: '6.5M', fact: 'The smallest and most densely populated country in Central America.' },
      { name: 'Grenada', flag: 'https://flagcdn.com/w40/gd.png', capital: 'Saint George\'s', continent: 'North America', population: '113K', fact: 'Known as the "Spice Island" and produces one-third of the world\'s nutmeg.' },
      { name: 'Guatemala', flag: 'https://flagcdn.com/w40/gt.png', capital: 'Guatemala City', continent: 'North America', population: '18.2M', fact: 'Home to the ancient Mayan city of Tikal and the world\'s largest jade deposits.' },
      { name: 'Haiti', flag: 'https://flagcdn.com/w40/ht.png', capital: 'Port-au-Prince', continent: 'North America', population: '11.7M', fact: 'The world\'s first black republic and home to the world\'s largest collection of voodoo artifacts.' },
      { name: 'Honduras', flag: 'https://flagcdn.com/w40/hn.png', capital: 'Tegucigalpa', continent: 'North America', population: '10.2M', fact: 'Home to the world\'s largest collection of Mayan ruins and the world\'s most dangerous city.' },
      { name: 'Jamaica', flag: 'https://flagcdn.com/w40/jm.png', capital: 'Kingston', continent: 'North America', population: '2.8M', fact: 'The birthplace of reggae music and home to the world\'s fastest man.' },
      { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png', capital: 'Mexico City', continent: 'North America', population: '130.3M', fact: 'Home to the world\'s smallest volcano and the largest pyramid in the world by volume.' },
      { name: 'Nicaragua', flag: 'https://flagcdn.com/w40/ni.png', capital: 'Managua', continent: 'North America', population: '6.9M', fact: 'Home to the world\'s largest collection of active volcanoes and the world\'s largest lake in Central America.' },
      { name: 'Panama', flag: 'https://flagcdn.com/w40/pa.png', capital: 'Panama City', continent: 'North America', population: '4.4M', fact: 'Home to the world\'s most important canal and the world\'s largest collection of sloths.' },
      { name: 'Saint Kitts and Nevis', flag: 'https://flagcdn.com/w40/kn.png', capital: 'Basseterre', continent: 'North America', population: '53K', fact: 'The smallest country in the Western Hemisphere and home to the world\'s largest collection of monkeys.' },
      { name: 'Saint Lucia', flag: 'https://flagcdn.com/w40/lc.png', capital: 'Castries', continent: 'North America', population: '184K', fact: 'The only country in the world named after a woman and home to the world\'s largest collection of parrots.' },
      { name: 'Saint Vincent and the Grenadines', flag: 'https://flagcdn.com/w40/vc.png', capital: 'Kingstown', continent: 'North America', population: '111K', fact: 'The world\'s largest producer of arrowroot and home to the world\'s largest collection of sea turtles.' },
      { name: 'Trinidad and Tobago', flag: 'https://flagcdn.com/w40/tt.png', capital: 'Port of Spain', continent: 'North America', population: '1.4M', fact: 'The birthplace of calypso music and home to the world\'s largest collection of hummingbirds.' },
      { name: 'United States of America', flag: 'https://flagcdn.com/w40/us.png', capital: 'Washington D.C.', continent: 'North America', population: '331.9M', fact: 'Home to the world\'s largest economy and the world\'s most visited national park.' },
      
      // South America (12 countries)
      { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', capital: 'Buenos Aires', continent: 'South America', population: '45.8M', fact: 'Home to the widest avenue in the world - Avenida 9 de Julio in Buenos Aires is 140 meters wide.' },
      { name: 'Bolivia', flag: 'https://flagcdn.com/w40/bo.png', capital: 'Sucre', continent: 'South America', population: '11.8M', fact: 'Home to the world\'s largest salt flat - Salar de Uyuni, which becomes a mirror during the rainy season.' },
      { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', capital: 'Brasília', continent: 'South America', population: '215.3M', fact: 'Home to the Amazon Rainforest, which produces 20% of the world\'s oxygen and contains 10% of all known species.' },
      { name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png', capital: 'Santiago', continent: 'South America', population: '19.5M', fact: 'The longest country in the world, stretching 4,300 km from north to south but only 177 km at its widest point.' },
      { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png', capital: 'Bogotá', continent: 'South America', population: '51.5M', fact: 'The only country in South America with coastlines on both the Pacific Ocean and Caribbean Sea.' },
      { name: 'Ecuador', flag: 'https://flagcdn.com/w40/ec.png', capital: 'Quito', continent: 'South America', population: '18.0M', fact: 'Named after the equator, which runs through the country, and home to the Galápagos Islands.' },
      { name: 'Guyana', flag: 'https://flagcdn.com/w40/gy.png', capital: 'Georgetown', continent: 'South America', population: '787K', fact: 'The only English-speaking country in South America and home to the world\'s largest single-drop waterfall.' },
      { name: 'Paraguay', flag: 'https://flagcdn.com/w40/py.png', capital: 'Asunción', continent: 'South America', population: '7.3M', fact: 'The world\'s largest producer of stevia and home to the world\'s largest collection of Jesuit missions.' },
      { name: 'Peru', flag: 'https://flagcdn.com/w40/pe.png', capital: 'Lima', continent: 'South America', population: '33.4M', fact: 'Home to Machu Picchu, one of the Seven Wonders of the World, and the world\'s highest navigable lake.' },
      { name: 'Suriname', flag: 'https://flagcdn.com/w40/sr.png', capital: 'Paramaribo', continent: 'South America', population: '591K', fact: 'The smallest country in South America and home to the world\'s largest collection of Dutch colonial architecture.' },
      { name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png', capital: 'Montevideo', continent: 'South America', population: '3.5M', fact: 'The world\'s most peaceful country in South America and home to the world\'s longest carnival.' },
      { name: 'Venezuela', flag: 'https://flagcdn.com/w40/ve.png', capital: 'Caracas', continent: 'South America', population: '28.4M', fact: 'Home to the world\'s highest waterfall and the world\'s largest oil reserves.' },
      
      // Oceania (14 countries)
      { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', capital: 'Canberra', continent: 'Oceania', population: '25.7M', fact: 'The only continent that is also a country, and home to more kangaroos than people.' },
      { name: 'Fiji', flag: 'https://flagcdn.com/w40/fj.png', capital: 'Suva', continent: 'Oceania', population: '896K', fact: 'Made up of 333 islands, with only 110 inhabited, and home to the world\'s softest coral.' },
      { name: 'Kiribati', flag: 'https://flagcdn.com/w40/ki.png', capital: 'Tarawa', continent: 'Oceania', population: '119K', fact: 'The only country in the world that spans all four hemispheres and home to the world\'s largest collection of atolls.' },
      { name: 'Marshall Islands', flag: 'https://flagcdn.com/w40/mh.png', capital: 'Majuro', continent: 'Oceania', population: '59K', fact: 'The world\'s largest shark sanctuary and home to the world\'s largest collection of nuclear test sites.' },
      { name: 'Micronesia', flag: 'https://flagcdn.com/w40/fm.png', capital: 'Palikir', continent: 'Oceania', population: '115K', fact: 'The world\'s most linguistically diverse country and home to the world\'s largest collection of stone money.' },
      { name: 'Nauru', flag: 'https://flagcdn.com/w40/nr.png', capital: 'Yaren', continent: 'Oceania', population: '11K', fact: 'The world\'s smallest republic and home to the world\'s largest collection of phosphate deposits.' },
      { name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png', capital: 'Wellington', continent: 'Oceania', population: '5.1M', fact: 'Home to more sheep than people and the first country to give women the right to vote.' },
      { name: 'Palau', flag: 'https://flagcdn.com/w40/pw.png', capital: 'Ngerulmud', continent: 'Oceania', population: '18K', fact: 'The world\'s first shark sanctuary and home to the world\'s largest collection of jellyfish.' },
      { name: 'Papua New Guinea', flag: 'https://flagcdn.com/w40/pg.png', capital: 'Port Moresby', continent: 'Oceania', population: '9.1M', fact: 'The world\'s most linguistically diverse country and home to the world\'s largest collection of butterflies.' },
      { name: 'Samoa', flag: 'https://flagcdn.com/w40/ws.png', capital: 'Apia', continent: 'Oceania', population: '200K', fact: 'The world\'s first country to see the sunrise and home to the world\'s largest collection of traditional tattoos.' },
      { name: 'Solomon Islands', flag: 'https://flagcdn.com/w40/sb.png', capital: 'Honiara', continent: 'Oceania', population: '707K', fact: 'The world\'s largest producer of copra and home to the world\'s largest collection of war canoes.' },
      { name: 'Tonga', flag: 'https://flagcdn.com/w40/to.png', capital: 'Nuku\'alofa', continent: 'Oceania', population: '106K', fact: 'The only remaining monarchy in the Pacific and home to the world\'s largest collection of whales.' },
      { name: 'Tuvalu', flag: 'https://flagcdn.com/w40/tv.png', capital: 'Funafuti', continent: 'Oceania', population: '12K', fact: 'The world\'s smallest country by population and home to the world\'s largest collection of postage stamps.' },
      { name: 'Vanuatu', flag: 'https://flagcdn.com/w40/vu.png', capital: 'Port Vila', continent: 'Oceania', population: '319K', fact: 'The world\'s happiest country and home to the world\'s largest collection of active volcanoes.' }
    ];
    
    generateBtn.addEventListener('click', () => {
      const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
      
      // Update country information with lazy loading
      const flagElement = document.getElementById('country-flag');
      flagElement.innerHTML = `
        <img src="${randomCountry.flag}" 
             alt="${randomCountry.name} flag" 
             loading="lazy"
             style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display: none; font-size: 3rem;">🏳️</div>
      `;
      document.getElementById('country-name').textContent = randomCountry.name;
      document.getElementById('country-fact').textContent = randomCountry.fact;
      
      // Update country details
      document.getElementById('country-details').innerHTML = `
        <div class="country-detail-item">
          <div class="country-detail-label">Capital</div>
          <div class="country-detail-value">${randomCountry.capital}</div>
        </div>
        <div class="country-detail-item">
          <div class="country-detail-label">Continent</div>
          <div class="country-detail-value">${randomCountry.continent}</div>
        </div>
        <div class="country-detail-item">
          <div class="country-detail-label">Population</div>
          <div class="country-detail-value">${randomCountry.population}</div>
        </div>
      `;
      
      // Show country card and hide placeholder
      countryPlaceholder.style.display = 'none';
      countryCard.style.display = 'block';
      countryCard.classList.add('slide-in-up');
      
      setTimeout(() => {
        countryCard.classList.remove('slide-in-up');
      }, 500);
    });
  }
}

// Random Number Generator
let numberStats = {
  generated: 0,
  numbers: [],
  total: 0
};

function initNumberGenerator() {
  const generateBtn = document.getElementById('generate-number');
  const resultDiv = document.getElementById('number-result');
  const minInput = document.getElementById('min-number');
  const maxInput = document.getElementById('max-number');
  const statsDiv = document.getElementById('number-stats');
  
  if (generateBtn && resultDiv && minInput && maxInput && statsDiv) {
    generateBtn.addEventListener('click', () => {
      const min = parseInt(minInput.value) || 1;
      const max = parseInt(maxInput.value) || 100;
      
      if (min > max) {
        resultDiv.textContent = 'Error: Min must be less than Max';
        resultDiv.style.color = 'var(--primary-color)';
        return;
      }
      
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      
      // Update statistics
      numberStats.generated++;
      numberStats.numbers.push(randomNumber);
      numberStats.total += randomNumber;
      
      // Keep only last 20 numbers for performance
      if (numberStats.numbers.length > 20) {
        numberStats.numbers.shift();
      }
      
      // Update display
      resultDiv.textContent = randomNumber;
      resultDiv.style.color = 'var(--primary-color)';
      resultDiv.classList.add('bounce-in');
      
      // Show and update statistics
      statsDiv.style.display = 'block';
      updateNumberStats(min, max);
      
      setTimeout(() => {
        resultDiv.classList.remove('bounce-in');
      }, 600);
    });
  }
}

// Set number range
function setRange(min, max) {
  const minInput = document.getElementById('min-number');
  const maxInput = document.getElementById('max-number');
  
  if (minInput && maxInput) {
    minInput.value = min;
    maxInput.value = max;
    
    // Update active button
    document.querySelectorAll('.count-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  }
}

// Update number statistics
function updateNumberStats(min, max) {
  const generatedCount = document.getElementById('generated-count');
  const currentRange = document.getElementById('current-range');
  const averageNumber = document.getElementById('average-number');
  const lastNumbers = document.getElementById('last-numbers');
  
  if (generatedCount) generatedCount.textContent = numberStats.generated;
  if (currentRange) currentRange.textContent = `${min}-${max}`;
  if (averageNumber) {
    const avg = numberStats.generated > 0 ? Math.round(numberStats.total / numberStats.generated) : '-';
    averageNumber.textContent = avg;
  }
  if (lastNumbers) {
    const last5 = numberStats.numbers.slice(-5).join(', ');
    lastNumbers.textContent = last5 || '-';
  }
}

// Clear number statistics
function clearNumberStats() {
  numberStats = {
    generated: 0,
    numbers: [],
    total: 0
  };
  
  const statsDiv = document.getElementById('number-stats');
  if (statsDiv) {
    statsDiv.style.display = 'none';
  }
  
  const resultDiv = document.getElementById('number-result');
  if (resultDiv) {
    resultDiv.textContent = 'Click the button above to generate a random number!';
    resultDiv.style.color = 'var(--text-light)';
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initEmojiGenerator();
  initCountryGenerator();
  initNumberGenerator();
  initSmoothScrolling();
  
  // Animate hero stats counters
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
  
  // Optimized intersection observer with throttling
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(
    throttle((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          
          // Add special animations to tool cards
          if (entry.target.classList.contains('tool-card')) {
            setTimeout(() => {
              entry.target.classList.add('interactive-hover');
            }, 300);
          }
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, 100),
    observerOptions
  );
  
  // Observe all tool cards and sections
  const elementsToAnimate = document.querySelectorAll('.tool-card, .section-title, .hero');
  elementsToAnimate.forEach(el => observer.observe(el));
  
  // Add click animations to buttons with debouncing
  document.querySelectorAll('button, .tool-link, .cta-button').forEach(button => {
    button.addEventListener('click', debounce(function() {
      this.classList.add('shake');
      setTimeout(() => {
        this.classList.remove('shake');
      }, 500);
    }, 100));
  });
  
  // Add floating animation to random elements
  const floatingElements = document.querySelectorAll('.tool-card:nth-child(odd)');
  floatingElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('float');
    }, index * 200);
  });
});

// Copy country information
function copyCountryInfo() {
  const countryName = document.getElementById('country-name').textContent;
  const countryFlag = document.getElementById('country-flag').textContent;
  const countryFact = document.getElementById('country-fact').textContent;
  
  if (countryName && countryFlag) {
    const countryInfo = `${countryFlag} ${countryName}\n\n${countryFact}`;
    copyToClipboard(countryInfo);
  }
}

// Clear country information
function clearCountry() {
  const countryCard = document.querySelector('.country-card');
  const countryPlaceholder = document.getElementById('country-placeholder');
  
  if (countryCard && countryPlaceholder) {
    countryCard.style.display = 'none';
    countryPlaceholder.style.display = 'block';
  }
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      // Show success message
      const message = document.createElement('div');
      message.textContent = 'Copied to clipboard!';
      message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 500;
      `;
      document.body.appendChild(message);
      
      setTimeout(() => {
        document.body.removeChild(message);
      }, 2000);
    });
  }
}
