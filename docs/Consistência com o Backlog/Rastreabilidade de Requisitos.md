## Funcionalidade 1°: Realizar um cadastro no aplicativo para que eu possa procurar e me candidatar a vagas de emprego na minha região
### Critérios de Aceitação:
1. O usuário deve fazer seu cadastro inicial com email ou número de telefone e uma senha de no máximo 10 caracteres, incluindo uma letra maiuscula, um caractere especial e um número.
2. O usuário deve poder adicionar suas experiências profissionais, incluindo seu título de cargo, empresa, data de início e término, sua formação profissional, idiomas caso o mesmo fale outras línguas como inglês, disponibilidade de tempo (integral ou meio período) e uma breve descrição das responsabilidades e realizações na última empresa.
3. O usuário deve poder selecionar o tipo de conta (candidato ou empregador).

### Candidato
![Imagem do WhatsApp de 2024-07-19 à(s) 13 56 23_f62c1ae8](https://github.com/user-attachments/assets/651080ed-01a9-418b-bbd6-f4d61784f411)
### Empregador
![çlkjhgf](https://github.com/user-attachments/assets/cfe028b5-7860-4381-a9e2-14cf0e04519b)

## Funcionalidade 2°: O aplicativo mantenha a qualidade das fotos que envio para o meu perfil, para que minha presença no aplicativo seja visualmente atrativa e profissional.
### Critérios de Aceitação:
1. O aplicativo deve suportar o upload de fotos nos formatos JPEG, PNG e HEIC. Otamanho máximo permitido para cada foto deve ser de 10 MB. O aplicativo deve manter a resolução original da foto até um limite máximo de 4096x4096 pixels.Caso a foto exceda limite de tamanho ou resolução, o aplicativo deve redimensioná-la automaticamente, utilizando algoritmos de compressão que preservem a qualidade da imagem.
2. As fotos enviadas devem ser exibidas em alta resolução (pelo menos 1080x1080 pixels) no perfil do usuário e nas candidaturas enviadas. O aplicativo deve utilizar técnicas de carregamento progressivo ou lazy loading para otimizar o tempo de carregamento das imagens em conexões mais lentas.
3. Após o upload da foto, o aplicativo deve exibir uma mensagem de confirmação indicando se a qualidade da imagem é adequada para o perfil e as candidaturas. Caso a qualidade da imagem seja considerada baixa (ex: resolução muito baixa, imagem borrada), o aplicativo deve exibir um alerta com sugestões para melhorar a qualidade da foto (ex: tirar uma nova foto com melhor iluminação, usar um formato de arquivo diferente). O aplicativo deve exibir um ícone de aviso ao lado da foto caso a qualidade seja considerada baixa.
   
![pefildes](https://github.com/user-attachments/assets/0fd829c2-4c2b-49ce-ab9f-42a083fafff7)

## Funcionalidade 3°: Como técnica em enfermagem em busca de oportunidades, quero encontrar vagas de emprego na minha cidade ou região, para que eu possa me candidatar a empregos locais e não ter que me deslocar para longe.
### Critérios de Aceitação:
1. O usuário deve poder acessar a página de busca de empregos a partir da página inicial
do aplicativo em no máximo dois cliques. A página de busca deve ter um campo de
pesquisa e opções para filtrar os resultados.
2. O aplicativo deve permitir que o usuário insira sua localização atual (utilizando
geolocalização com permissão prévia) ou selecione uma cidade/região específica.Os
resultados da busca devem exibir apenas as vagas que correspondem à localização
selecionada pelo usuário.
3. As vagas de emprego exibidas nos resultados da busca devem ser relevantes para a
área buscada. Cada vaga deve apresentar as seguintes informações:Título da vaga, a distância entre a empresa e a localização do candidoto e Salário (se disponível).

![feed cand](https://github.com/user-attachments/assets/dc17bc6b-ca08-4b37-b4c7-f08a76caa53d)
## Funcionalidade 5°: Como técnica em enfermagem, quero ver vagas de emprego específicas para minha profissão, para que eu possa me concentrar nas oportunidades que são relevantes para minha área de atuação.
### Critérios de Aceitação:
1. O usuário deve poder selecionar "Técnico em Enfermagem" a partir de uma lista de
 profissões na área da saúde, exibida em um menu ou lista de seleção. A lista de profissões
 deve ser abrangente e incluir as principais áreas de atuação da enfermagem.O usuário
 deve poder alterar sua seleção de profissão a qualquer momento.
2. O aplicativo deve filtrar e exibir apenas as vagas de emprego que correspondem à
 profissão selecionada pelo usuário ("Técnico em Enfermagem"). As vagas exibidas devem
 ser relevantes para a área de atuação do técnico de enfermagem, como hospitais, clínicas,
 laboratórios, etc.
3. Cada vaga exibida deve incluir os seguintes detalhes: Título da vaga, Nome da
 empresa, Localização (cidade, estado), Tipo de contrato (CLT, PJ, temporário, etc.) Salário
 (se disponível), Descrição da vaga (atividades, responsabilidades),Requisitos (escolaridade,
 experiência, cursos, etc.),Benefícios (vale transporte, vale alimentação, plano de saúde,
 etc.),Data de publicação da vaga, Informações de contato da empresa (telefone, e-mail,
 site).

![asdfghjk](https://github.com/user-attachments/assets/24493a9a-1ae4-4aa1-b749-7ffd70e75760)

## Funcionalidade 6: Como técnico recém-formado, quero encontrar vagas de emprego que aceitem candidatos com pouca ou nenhuma experiência, para que eu possa iniciar minha carreira e ganhar experiência na área.
### Critérios de Aceitação:
1. Na página de resultados da busca, deve haver um filtro claramente identificado e acessível (ex: checkbox) para selecionar o nível de experiência desejado. O filtro deve incluir as seguintes opções: "Sem experiência", "Pouca experiência (até 1 ano)" "Nível Júnior (1-3 anos)"
2. Ao selecionar o filtro "Sem experiência" ou "Pouca experiência", os resultados dabusca devem ser atualizados para exibir apenas as vagas que explicitamente mencionam que aceitam candidatos sem experiência ou recém-formados.Não exigem um número mínimo de anos de experiência na área. São classificadas como "estágio", ou "nível júnior".

![imagem filtro](https://github.com/user-attachments/assets/d30e95c2-8503-4ea6-9dd7-1078982eb3fd)


## Funcionalidade 7: Como técnico em busca de conhecimento contínuo, quero acessar informações detalhadas sobre as vagas de emprego, incluindo requisitos e responsabilidades, para que eu possa me preparar adequadamente e entender melhor as expectativas da posição.
### Critérios de Aceitação:
1. O usuário deve poder clicar/tocar no título ou em um botão específico (ex: "Ver Detalhes") em cada vaga listada nos resultados da busca para acessar a página de descrição detalhada. A página de descrição detalhada deve ser carregada em menos de 3 segundos.
2. A descrição detalhada da vaga deverá seguir um formato padronizado já padronizado dentro do aplicativo.(Título da vaga,Nome da empresa.Localização: cidade, estado e, se aplicável, endereço completo,Tipo de contrato: CLT, PJ e estágio. Salário:se disponível, com indicação de faixa salarial ou valor exato,Benefícios: vale transporte, vale alimentação, plano de saúde. Descrição das atividades e responsabilidades: em formato de lista ou parágrafos. Requisitos obrigatórios: escolaridade, experiência, certificações. Requisitos desejáveis: conhecimentos em softwares específicos, idiomas, informações adicionais: horário de trabalho, cultura da empresa. Data de publicação da vaga,Informações de contato da empresa: e-mail, telefone, site.)
3. O usuário deve poder salvar ou marcar as vagas de interesse clicando/tocando em umícone de "favorito" (ex: coração, estrela) na página de descrição detalhada da vaga ou na lista de resultados da busca. As vagas salvas/marcadas devem ser armazenadas em uma lista separada, acessível a partir do menu do aplicativo. O usuário deve poder remover uma vaga da lista de salvos/marcados a qualquer momento.
   
![8 pow](https://github.com/user-attachments/assets/f55db2e4-4245-4f46-b146-59c3d3b873f9)


## Funcionalidade 8: Como gerente de RH que enfrenta dificuldades na contratação de funcionários qualificados, quero poder filtrar candidatos com base em qualificações e experiências específicas, para que eu possa encontrar os melhores candidatos para as vagas da minha empresa.
### Critérios de Aceitação:
1. O usuário deve poder acessar uma página de busca de candidatos a partir do menu principal do aplicativo. A página de busca deve ter um campo de pesquisa por palavra-chave e filtros para refinar os resultados. Os resultados da busca devem ser exibidos em uma lista, com a opção de visualizar o perfil completo de cada candidato.
2. O aplicativo deve permitir a seleção de filtros para refinar a busca por candidatos, incluindo:Nível de experiência, Área de formação, Habilidades específicas ,Idiomas: (Inglês, Espanhol, etc.) Disponibilidade:(Tempo integral ou meio período) Localização:(Cidade, estado, país). Os filtros devem ser combináveis, permitindo ao usuário selecionar múltiplos critérios simultaneamente.
3. Os resultados da busca devem exibir apenas os candidatos que atendem aos critérios de filtro selecionados pelo usuário.Os resultados devem ser ordenados por relevância, com base na combinação dos critérios de filtro e na correspondência com a palavra-chave pesquisada. Cada resultado deve exibir um resumo do perfil do candidato, incluindo:nome completo, foto (se disponível), cargo atual ou último cargo ocupado, tempo de experiência principais habilidades e localização

![salvacomo](https://github.com/user-attachments/assets/f03884c5-4a88-488c-8bf6-17d0af74aaa7)

## Funcionalidade 9: Uma pessa que prefere um processo passo a passo para evitar erros nas contratações, quero ter um guia passo a passo , para que eu possa seguir um processo estruturado e reduzir a chance de erros.
### Critérios de Aceitação:
1.  O usuário deve poder acessar o guia passo a passo a partir da seção de "Gerenciamento de Vagas" ou similar no aplicativo. O guia deve ser facilmente acessível em todas as etapas do processo de contratação como: Triagem inicial de currículos,Testes (técnicos, psicológicos, etc.) e Elaboração da proposta de emprego. Cada etapa vai conter uma descrição detalhada das atividades a serem realizada e exemplos de perguntas para entrevistas e testes
2. O aplicativo deve fornecer lembretes para cada etapa do processo, com prazos personalizáveis.O usuário deve poder marcar as tarefas como concluídas em um checklist interativo.O checklist deve ser exibido de forma clara e concisa, permitindo ao usuário acompanhar seu progresso no processo de contratação.
3. O usuário deve poder personalizar o guia de acordo com as necessidades da sua empresa e do cargo em questão. A personalização pode incluir a adição ou remoção de etapas, a modificação dos modelos de documentos e a inclusão de informações específicas da empresa

![tortoria](https://github.com/user-attachments/assets/53752342-4dcb-4b79-89e4-e2b4848390f7)
