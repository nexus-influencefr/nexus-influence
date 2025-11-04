import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { analyzeAndRespond } from './chatbotAI'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Salut ! 👋 Je suis NexusBot, ton assistant pour tout savoir sur Nexus Influence. Que tu sois créateur, marque ou juste curieux, je suis là pour t\'aider. Comment puis-je t\'aider aujourd\'hui ?'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const faqQuestions = [
    {
      question: 'Comment devenir créateur chez Nexus ?',
      answer: 'Bien sûr ! Chez Nexus Influence, on accompagne les créateurs dans leur développement. Contacte-nous via notre formulaire ou à contact@nexusinfluence.fr, et on étudiera ton profil ensemble. Tu veux qu\'on parle de ton projet ?'
    },
    {
      question: 'Quels sont vos services ?',
      answer: 'On propose un accompagnement complet : stratégie & audit de profil, création de media kit, négociation de collaborations avec des marques, monétisation de communauté, et conseil business. Nos offres sont personnalisées selon ton profil. Un service t\'intéresse en particulier ?'
    },
    {
      question: 'Qui sont les fondateurs ?',
      answer: 'Nexus Influence a été créée par Pierre O\'Neill et Vasco Preun, deux jeunes entrepreneurs passionnés par l\'entrepreneuriat et les réseaux sociaux. Leur mission : rendre le monde de l\'influence plus humain, transparent et professionnel.'
    },
    {
      question: 'Qui accompagnez-vous ?',
      answer: 'On travaille avec plusieurs créateurs comme Flo (lifestyle & mode), Olary (food, lifestyle & Twitch), Alexis (fitness & bien-être) et Alice (mode et modelling). Et d\'autres sont en cours d\'onboarding ! Tu veux en savoir plus sur l\'un d\'eux ?'
    }
  ]

  const handleFaqClick = (faq) => {
    setMessages([
      ...messages,
      { type: 'user', text: faq.question },
      { type: 'bot', text: faq.answer }
    ])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue
    const aiResponse = analyzeAndRespond(userMessage, messages)

    setMessages([
      ...messages,
      { type: 'user', text: userMessage },
      { type: 'bot', text: aiResponse }
    ])
    setInputValue('')
  }

  return (
    <>
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="chatbot-notification-dot"></span>
        <span className="chatbot-icon-emoji">💬</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <img 
                  src="/logo.svg" 
                  alt="Nexus Influence" 
                  className="chatbot-logo"
                  onError={(e) => e.target.src = '/logo.png'}
                />
                <div>
                  <h3>Nexus Influence</h3>
                  <span className="chatbot-status">En ligne</span>
                </div>
              </div>
              <button 
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-content">
              {showFAQ ? (
                <div className="faq-section">
                  <div className="faq-header">
                    <h4>Questions fréquentes</h4>
                    <button 
                      className="faq-close"
                      onClick={() => setShowFAQ(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="faq-list">
                    {faqQuestions.map((faq, index) => (
                      <button
                        key={index}
                        className="faq-item"
                        onClick={() => {
                          handleFaqClick(faq)
                          setShowFAQ(false)
                        }}
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSendMessage} className="chatbot-form">
                    <input
                      type="text"
                      placeholder="Tapez votre message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="chatbot-input"
                      autoFocus
                    />
                    <button type="submit" className="chatbot-send">
                      Envoyer →
                    </button>
                  </form>
                  <button 
                    className="show-faq-btn"
                    onClick={() => setShowFAQ(true)}
                  >
                    💡 Voir les questions fréquentes
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

