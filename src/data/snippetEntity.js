const snippetEntity = {
  title: 'Untitled',
  access_level: 0,
  favorite: 0,
  tags: [],
  editor_options: {
    indent_size: 2,
  },
  code: '',
  language: 'Markdown',
  deleted: 0,
  remote_id: null,
  last_sync: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const welcomeSnippet = {
  ...snippetEntity,
};
welcomeSnippet.title = 'Follow The White Rabbit ..';
welcomeSnippet.tags = ['Hello World ❤️'];
welcomeSnippet.favorite = 1;
welcomeSnippet.code = `                   
                            ^?77.   :~^                                       
                            Y~ ^J7 :5^??                                      
                           .P.   !JP!  Y!                                     
                           ^5     .?J  .5^                                    
                           :P       7J  ^5.                                   
                            J7       5^  7J                                   
                             J7      Y~  .P                                   
                              !Y:   .P~::~P..                                 
                               :P.   ^^~~!7!!77!:                             
                                5^             ^Y!                            
                                P:        ~GB7   J7                           
                               :P.        ~PBG.   ?J                          
              .:^^~~~~^^::...:!J^                  !Y:                        
          :~!77!~~^^^^^~~!!!!!^.   Y:             .:.5~                       
       .!?7^.                      ~5:             ?YJ:                       
     .7?~.                          ^?7!~^:.   ..:^?7                         
    !J^                               .:^~!!7Y7!!!~.                          
    J?    .:~!!!!~~:                          P^                               
  J?    !?!^:...:^!?7.                       P:                               
 ~5     .           ^J!                     ^5                                
 Y~                   Y!                    5~                                
 P:                   :5                   J?                                 
 P:                   ^5                 :J7                                  
  ??                  .Y~               .7J^                                   
 .P.               .~J~                J?                                     
  ~Y:         ::^!??!.                 :77!:                                  
   :J7^.      ~!7?7!!!!!!!7~^~!777!^.     :!J:                                
     :!77!~^:...          ^G^::.  :!77~~~~^^Y^                                
         .^~!!!!!!!777777!J^         :^^^^^^.                                                               
`;

export { welcomeSnippet, snippetEntity };
