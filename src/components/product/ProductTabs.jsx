import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Zap, Activity, Heart, DollarSign, CheckCircle2, Trophy, Clock, Coffee, Moon, ArrowRight } from 'lucide-react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('descricao');

  const tabs = [
    { id: 'descricao', label: 'Descrição' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'como-usar', label: 'Como Usar' },
    { id: 'especificacoes', label: 'Especificações' },
  ];

  return (
    <div className="w-full mt-16 bg-card rounded-[12px] border shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row border-b overflow-x-auto hide-scrollbar bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-5 font-poppins font-semibold text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabProductIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {activeTab === 'descricao' && (
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  O <strong>Whey Protein Concentrado Rosa Suplementos</strong> é a escolha perfeita para quem busca ganho de massa muscular com qualidade premium. Formulado com proteína concentrada de alta pureza, cada porção fornece <strong>25g de proteína pura</strong>, essencial para a síntese proteica e recuperação muscular pós-treino.
                </p>
                <p>
                  Com absorção rápida, este whey é ideal para consumir logo após o treino, aproveitando a <strong>janela anabólica</strong> para máximos resultados. Disponível em 5 sabores deliciosos: Chocolate, Morango, Baunilha, Cookies e Cappuccino.
                </p>
                <p>
                  Testado e certificado pela ANVISA, garantimos qualidade e segurança em cada porção. Escolhido por mais de <strong>15.000 clientes satisfeitos</strong> em todo Brasil. Com 4.9/5 de avaliação média, este é o whey mais vendido da categoria.
                </p>
              </div>
            )}

            {activeTab === 'beneficios' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Beaker, title: 'Proteína de Alta Qualidade', desc: '25g de proteína concentrada pura por porção.' },
                  { icon: Activity, title: 'Recuperação Rápida', desc: 'Rico em BCAAs para recuperação acelerada.' },
                  { icon: Zap, title: 'Absorção Rápida', desc: 'Ideal para a janela anabólica pós-treino.' },
                  { icon: Heart, title: 'Sabor Delicioso', desc: '5 opções de sabores irresistíveis.' },
                  { icon: DollarSign, title: 'Melhor Custo-Benefício', desc: 'Rende incríveis 40 porções por pote.' },
                  { icon: Trophy, title: 'Mais Vendido', desc: 'Mais de 50.000 unidades vendidas no Brasil.' },
                  { icon: CheckCircle2, title: 'Garantido', desc: 'Satisfação garantida em 30 dias ou seu dinheiro de volta.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-5 rounded-xl bg-muted/50 border hover:border-primary/30 transition-colors">
                    <div className="text-primary bg-primary/10 p-3 rounded-xl h-fit flex-shrink-0">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'como-usar' && (
              <div className="space-y-10 text-muted-foreground">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-poppins font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-secondary" /> Como Preparar
                    </h4>
                    <ol className="space-y-4 pl-2">
                      <li className="flex gap-4 items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">1</span>
                        <p className="pt-1">Adicione 200ml de água ou leite em uma coqueteleira.</p>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">2</span>
                        <p className="pt-1">Adicione 1 medidor cheio (30g) do Whey Protein.</p>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">3</span>
                        <p className="pt-1">Agite vigorosamente por 30 segundos até dissolver por completo.</p>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-poppins font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-secondary" /> Dosagem Recomendada
                    </h4>
                    <div className="space-y-3 bg-muted/30 p-6 rounded-xl border">
                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-medium text-foreground">Iniciantes</span>
                        <span className="text-primary font-bold">1x ao dia</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-medium text-foreground">Intermediários</span>
                        <span className="text-primary font-bold">1 a 2x ao dia</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Avançados</span>
                        <span className="text-primary font-bold">2 a 3x ao dia</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-poppins font-bold text-xl text-foreground mb-6">Melhores Horários</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/30 rounded-xl border text-center">
                      <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="font-bold text-foreground">Pós-Treino</div>
                      <div className="text-xs mt-1">Ideal (Rápida absorção)</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border text-center">
                      <Coffee className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                      <div className="font-bold text-foreground">Café da Manhã</div>
                      <div className="text-xs mt-1">Quebrar jejum</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <div className="font-bold text-foreground">Lanche</div>
                      <div className="text-xs mt-1">Manter saciedade</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border text-center">
                      <Moon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                      <div className="font-bold text-foreground">Antes de Dormir</div>
                      <div className="text-xs mt-1">Recuperação noturna</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'especificacoes' && (
              <div className="overflow-x-auto bg-muted/10 rounded-xl border">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <tbody>
                    {[
                      ['Sabores Disponíveis', 'Chocolate, Morango, Baunilha, Cookies, Cappuccino'],
                      ['Tamanho / Peso', '1 Pote (1kg / 1000g)'],
                      ['Proteína por Porção', '25g'],
                      ['Calorias', '110 kcal'],
                      ['Carboidratos', '2g'],
                      ['Gorduras', '1g'],
                      ['Ingredientes', 'Concentrado de Proteína de Soro de Leite, Aroma Natural, Adoçante Sucralose, Emulsificante Lecitina de Soja'],
                      ['Validade', '24 meses após fabricação'],
                      ['Certificações', 'ANVISA, ISO 9001, Verified'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-foreground w-1/3 bg-muted/20">{row[0]}</td>
                        <td className="py-4 px-6 text-muted-foreground">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}