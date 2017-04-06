var app=app||{};app.urls=function(){this.url=window.location.href;this.url.split("/");return this.url=window.location.href,this.split=this.url.split("/"),this.website=this.split[0]+"//"+this.split[2],this.dashboard=this.website+"/dashboard/",this.experiments=this.website+"/apis/experiments/",this.measurement=this.website+"/apis/measurements/",this.experiment=this.website+"/apis/experiment/",this.user_specific=this.website+"/apis/user-specific/",this.user_experiment=this.website+"/apis/user-experiment",this.user_specific_name=this.website+"/apis/user-specific-name/",this.user=this.website+"/apis/user-experiment/",this.registration=this.website+"/apis/registration/",this.groups=this.website+"/apis/groups/",this.textanalyzer=this.website+"/apis/textanalyzer/",this.textdata=this.website+"/apis/textdata/",this.csv_text_data=this.website+"/csv_text_export/",this.single_experiment=this.website+"/experiment/",this.run_experiment=this.website+"/run-experiment/",this}(),app.constants=function(){return this.editor_textinput=["<p>Der Editor zur Analyse der Kohärenz von Texten.</p>","<p>Schreibe hier deinen Text, klicke auf <em>Analyziere Text</em> und lass dir anzeigen, wie kohärent dein Text ist.</p>"],this.toast_textinput=["Dein Text konnte nicht verarbeitet werden!                              Schaue, ob du mindestens zwei Sätze geschrieben hast."],this.simpleRevisionModal="Sie haben nun die Gelegenheit Ihren Text zu überarbeiten.                                 Versuchen Sie potentielle Kohärenzbrüche in Ihrem Text zu                                 schließen und Bezüge zwischen den Konzepten klar darzustellen.                                 Integrieren Sie in Ihrer Überarbeitung auch Konzepte und Verbindungen                                 zwischen Konzepten, die Sie eventuell in Ihrem Entwurf noch nicht                                 bedacht haben.",this}(),app.getExperimentId=function(){var e=window.location.href,t=e.substr(e.lastIndexOf("/")+1);return t},app.regExText=function(e){var t=$("#editor-textinput").html();t=t.replace(/[Cc]ognitive [Ll]oad [Tt]heor(y|(ie))/g,"Cognitive-Load-Theory"),t=t.replace(/[Ee]xtrinsischer? [Bb]elastung/g,"Extrinsische-Belastung"),t=t.replace(/[Ii]ntrinsischer? [Bb]elastung/g,"Intrinsische-Belastung"),t=t.replace(/[Ll]ernbezogener? [Bb]elastung/g,"Lernbezogene-Belastung"),t=t.replace(/[Ee]xtrinsic [Ll]oad/,"Extrinsic-Load"),t=t.replace(/[Ii]ntrinsic [Ll]oad/g,"Intrinsic-Load"),t=t.replace(/[Gg]ermane [Ll]oad/g,"Germane-Load"),t=t.replace(/bzw.?/g,"beziehungsweise"),$(e).html(t)},app.getParagraphs=function(e){var t=e.find("p"),n="";return t.each(function(e){var i=t[e].innerText.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),r=$(i);n+=t[e].innerText+" ",$(this).html(r),$(this).append(".")}),n.replace(/(\r\n|\n|\r)/gm,""),n.replace(/\s\s+/g,""),n},app.getPlainText=function(e){var t=e.find("p"),n="";return t.each(function(e){n+=t[e].innerText+"|LINE-BREAK|"}),n},app.escapeRegExp=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},app.replaceAll=function(e,t,n){return e.replace(new RegExp(t,"g"),n)},app.getCookie=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),i=0;i<n.length;i++){var r=jQuery.trim(n[i]);if(r.substring(0,e.length+1)==e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t},app.csrfSafeMethod=function(e){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)},app.sameOrigin=function(e){var t=document.location.host,n=document.location.protocol,i="//"+t,r=n+i;return e==r||e.slice(0,r.length+1)==r+"/"||e==i||e.slice(0,i.length+1)==i+"/"||!/^(\/\/|http:|https:).*/.test(e)},app.highlightWholeText=function(e,t,n){for(var i=[],r=0;r<t.length;r++)i[r]=[].concat.apply([],Object.keys(t[r]).map(function(e){return[t[r][e].source.word,t[r][e].target.word]}));$(e).find("p").each(function(e){var t=$(this).text();$(this).html(app.colorText(t,this,i,n))})},app.colorText=function(e,t,n,i){for(var r=e,a=(e.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"").split(" "),r.replace(/[^\wöäüÄÖÜß-\s]|_/g,function(e){return" "+e+" "}).replace(/[ ]+/g," ").split(" ")),s=0;s<a.length;s++)for(var l=a[s],o=0;o<n.length;o++)-1!=$.inArray(l,n[o])&&(a[s]=l.replace(l,'<a style="background-color: '+i(o)+';color: #fff;border-radius: 3px; padding: 1px 3px;" class="cluster'+o+'">'+l+"</a>"));return a.join(" ")},app.highlightSelectedWord=function(e,t){$(e).find("p").each(function(e){var n=$(this).text(),i=n.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),r=$(i);i=r.map(function(e){if("SPAN"==r[e].tagName){var n=r[e];if(t.indexOf(n.innerHTML)>-1)return n.className+=" highlight-related",n}return e}),$(this).html(r),$(this).append(".")})},app.getLinksNodes=function(e){var t=[],n=[],i=[],r=[];e.forEach(function(e){t.push(e.source.lemma),t.push(e.target.lemma)}),$.each(t,function(e,t){-1===$.inArray(t,n)&&n.push(t)}),$.each(n,function(e){i.push({index:e,id:n[e]})}),$.each(e,function(t){r.push({source:e[t].source.lemma,target:e[t].target.lemma})});var a={nodes:i,links:r};return a};var app=app||{};app.TextAnalyzerModel=Backbone.Model.extend({url:app.urls.textanalyzer});var app=app||{};app.ExperimentModel=Backbone.Model.extend({defaults:{name:"",nr_measurements:"",nr_groups:""},url:app.urls.experiment+app.getExperimentId()});var app=app||{};app.UserModel=Backbone.Model.extend({url:app.urls.user_experiment+app.getExperimentId()});var app=app||{};app.UserSpecificModel=Backbone.Model.extend({url:app.urls.user_specific+app.getExperimentId()});var app=app||{};app.GroupsModel=Backbone.Model.extend({url:app.urls.groups});var app=app||{};app.MeasurementModel=Backbone.Model.extend({url:app.urls.measurement});var app=app||{};app.ExperimentsModel=Backbone.Model.extend({url:app.urls.experiments});var app=app||{};app.TextModelComplete=Backbone.Model.extend({url:app.urls.textdata+app.getExperimentId(),defaults:{pre_text:null,post_text:null,pre_num_sentences:null,post_num_sentences:null,pre_num_clusters:null,post_num_clusters:null,pre_num_coherent_sentences:null,post_num_coherent_sentences:null,pre_num_non_coherent_sentences:null,post_num_non_coherent_sentences:null,pre_page_duration:null,post_page_duration:null,pre_num_concepts:null,post_num_concepts:null,pre_local_cohesion:null,post_local_cohesion:null}});var app=app||{};app.ExperimentsCollection=Backbone.Collection.extend({url:app.urls.experiments});var app=app||{};app.UserCollection=Backbone.Model.extend({url:app.urls.user_experiment+"/"+app.getExperimentId()});var app=app||{};app.MeasurementCollection=Backbone.Collection.extend({model:app.MeasurementModel});var app=app||{};app.LandingView=Backbone.View.extend({el:$("#landingview"),events:{"click #editor-button":"analyzeText","click #editor-full-button":"reanalyzeText","mouseover #editor-full-medium-editor span":"onTextHover","mouseout #editor-full-medium-editor span":"onTextHoverOff"},initialize:function(){this.colors=d3.scaleOrdinal(d3.schemeCategory10),this.simulations={},this.$el.find("#landingview-editor").html(Handlebars.templates.editor({instruction:""}));var e=new MediumEditor("#editor-textinput",{toolbar:!1,placeholder:!1});if(null===localStorage.getItem("firstVisit"))$("#editor-textinput").typed({strings:app.constants.editor_textinput,typeSpeed:2,contentType:"html",cursorChar:"",callback:function(){var t=document.querySelector("#editor-textinput").firstChild;e.selectElement(t)}});else{$("#editor-textinput").html("<p>Schreibe hier ...</p>");var t=document.querySelector("#editor-textinput").firstChild;e.selectElement(t)}this.analyzer=new app.TextAnalyzerModel,_.bindAll(this,"onTextHover")},analyzeText:function(){var e=this,t=app.getParagraphs(this.$el.find("#editor-textinput"));this.$el.find("#editor-button-div").html(Handlebars.templates["loading-ring"]()),this.analyzer.set({text:t}),this.analyzer.save(null,{success:function(t){e.renderGraph("#editor-textinput",!0,"#editor-full-medium-editor","#editor-full-graph",e.colors)},error:function(t,n){console.log(n.responseText),Materialize.toast(app.constants.toast_textinput,4e3),e.$el.find("#editor-button-div").html(Handlebars.templates.text_analyze_button())}})},reanalyzeText:function(){var e=this,t=app.getParagraphs(this.$el.find("#editor-full-medium-editor"));app.getPlainText(this.$el.find("#editor-full-medium-editor"));this.$el.find("#editor-full-button-div").html(Handlebars.templates["loading-ring"]()),this.analyzer.set({text:t}),this.analyzer.save(null,{success:function(t){e.renderGraph("#editor-full-medium-editor",!1,"#editor-full-medium-editor","#editor-full-graph",e.colors),e.$el.find("#editor-full-button-div").html(Handlebars.templates.text_analyze_button_full())},error:function(t,n){Materialize.toast(app.constants.toast_textinput,4e3),e.$el.find("#editor-full-button-div").html(Handlebars.templates.text_analyze_button_full())}})},onTextHover:function(e){function t(e,t){return i(e,t)||n(e,t)||e.index==t.index}function n(e,t){return p[e.index+","+t.index]}function i(e,t){return p[t.index+","+e.index]}var r=e.currentTarget.innerText,a=this.analyzer.get("wordLemmaRelations")[r];if(a){var s=this.analyzer.get("clusters"),l=null;for(var o in s)s[o].map(function(e,t){var n=e.source.word,i=e.target.word;(r==n||r==i)&&(l=o)});var p=this.simulations[l].linkedByIndex,c=this.simulations[l].svg,u=d3.select("#node-"+a[0]),d=u.data()[0];u.select("text").style("opacity",1).style("font-weight","bold");c.selectAll("text").style("opacity",function(e){return t(d,e)?1:.1}),c.selectAll("circle").style("fill",function(e){return t(d,e)?"#000":"#f4f4f4"}).style("opacity",function(e){return t(d,e)?1:.2}),c.selectAll("line").style("stroke",function(e){return e.source.id===d.id||e.target.id===d.id?"#4c4c4c":"#f4f4f4"})}},onTextHoverOff:function(e){d3.selectAll("text").style("opacity",.8).style("font-weight","normal"),d3.selectAll("circle").style("fill","#ccc").style("opacity",1),d3.selectAll(".links").selectAll("line").style("stroke","#ccc")},renderGraph:function(e,t,n,i){var r=this.$el.find(e).html();this.clusters=this.analyzer.get("clusters"),t&&this.$el.find("#landingview-editor").html(Handlebars.templates["editor-full"]({text:r}));var a=(new MediumEditor(n,{toolbar:!1}),$(i).width()),s=$(n).height();$(i).empty(),this.renderCmap(this.analyzer.get("word_pairs"),this.analyzer.get("numConcepts"),this.analyzer.get("numClusters"),i,s,a,this.colors),null===localStorage.getItem("firstVisit")&&(this.$el.append(Handlebars.templates.modal_instruction()),$("#modal-instruction").openModal(),localStorage.setItem("firstVisit",!1))},renderCmap:function(e,t,n,i,r,a,s){function l(e,t){function n(e){var t=(d3.mouse(this),x.select("#node-"+e.id)),n=t.data()[0],i=t.select("text").style("opacity",1).style("font-weight","bold");m.selectAll("text").style("opacity",function(e){return r(n,e)?1:.1}),m.selectAll("circle").style("fill",function(e){return r(n,e)?"#000":"#f4f4f4"}).style("opacity",function(e){return r(n,e)?1:.2}),m.selectAll("line").style("stroke",function(e){return e.source.id===n.id||e.target.id===n.id?"#4c4c4c":"#f4f4f4"});var a=(i.text(),[]);m.selectAll("text").each(function(e){r(n,e)&&a.push(e)});var s=(p.analyzer.get("lemmaWordRelations"),a.map(function(e){return p.analyzer.get("lemmaWordRelations")[e.id]}));s=[].concat.apply([],s),app.highlightSelectedWord("#editor-full-medium-editor",s)}function r(e,t){return s(e,t)||a(e,t)||e.index==t.index}function a(e,t){return g[e.index+","+t.index]}function s(e,t){return g[t.index+","+e.index]}function l(){x.attr("transform",d3.event.transform)}var d=e,h=app.getLinksNodes(d),m=d3.select(i).append("svg"),f=d3.forceSimulation(h.nodes).force("charge",d3.forceManyBody().strength(-240)).force("link",d3.forceLink(h.links).distance(200).id(function(e){return e.id})).force("center",d3.forceCenter(u/2,c/2)).force("x",d3.forceX()).force("y",d3.forceY()).stop(),x=m.append("g"),g={};m.call(d3.zoom().scaleExtent([.1,10]).on("zoom",l));var v=m.append("text").attr("dy","0.35em").attr("text-anchor","middle").attr("font-family","sans-serif").attr("font-size",10).attr("x",u/2).attr("y",c/2).text("Simulating. One moment please…");d3.timeout(function(){v.remove();for(var e=0,i=Math.ceil(Math.log(f.alphaMin())/Math.log(1-f.alphaDecay()));i>e;++e)f.tick();var r=x.append("g").attr("class","links").selectAll("line").data(h.links).enter().append("line").attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y});r.each(function(e){g[e.source.index+","+e.target.index]=!0}),p.simulations[t]={simulation:f,linkedByIndex:g,svg:m};var a=x.append("g").attr("class","nodes").selectAll(".node").data(h.nodes).enter().append("g").attr("id",function(e,t){return"node-"+e.id}).attr("class","node").attr("transform",function(e){return"translate("+e.x+","+e.y+")"}).on("mouseover",n).on("mouseout",o);a.append("circle").attr("r",10).attr("cx",0).attr("cy",0).attr("fill","#ccc"),a.append("text").attr("dy",-10).attr("dx",12).style("opacity",.8).attr("text-anchor","start").text(function(e){return e.id})})}function o(){$("#editor-full-medium-editor").find("p").each(function(e){var t=$(this).text(),n=t.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),i=$(n);$(this).html(i),$(this).append(".")});var e=d3.selectAll(".node");e.selectAll("text").style("opacity",.8).style("font-weight","normal"),d3.selectAll("circle").style("fill","#ccc").style("opacity",1),d3.selectAll(".links").selectAll("line").style("stroke","#ccc")}for(var p=this,c=r/2,u=a/2,d=0;d<this.clusters.length;d++)l(this.clusters[d],d)}}),"/"==window.location.pathname&&new app.LandingView;var app=app||{};app.LoginView=Backbone.View.extend({initialize:function(){console.log("login")}}),"/login/"==window.location.pathname&&new app.LoginView;var app=app||{};app.DashboardView=Backbone.View.extend({el:$("#dashboard"),events:{"click .table-row":"redirect"},initialize:function(){var e=this;this.experiments=new app.ExperimentsCollection,this.experiments.fetch({success:function(){e.renderExperiments()}})},renderExperiments:function(){this.$el.find("#experiments").html(Handlebars.templates.experiments({experiment:this.experiments.toJSON()})),this.$el.on(".table-row",this.redirect,this)},redirect:function(e){var t=$(e.currentTarget).attr("id");window.location=app.urls.single_experiment+t}}),"/dashboard/"==window.location.pathname&&new app.DashboardView;var app=app||{};app.ExperimentView=Backbone.View.extend({el:$("#experiment-single"),events:{"click #new-user-button":"generateUser","click #data-export-button":"dataExport"},initialize:function(){this.experiment_id=app.getExperimentId(),this.singleExperimentModel=new app.ExperimentModel,this.UserCollection=new app.UserCollection,this.UserModel=new app.UserModel;var e=this;this.singleExperimentModel.fetch({success:function(t){e.renderHeader()},error:function(){Materialize.toast("Das Experiment konnte nicht gefunden werden!",4e3)}}),this.fetchUsers()},fetchUsers:function(){var e=this;this.UserCollection.fetch({success:function(t){e.renderUsers()},error:function(){Materialize.toast("Die Nutzerdaten konnten nicht gefunden werden!",4e3)}})},renderHeader:function(){this.$("h1").first().html(this.singleExperimentModel.get("name")),this.$("#experiment-header").attr("href",app.urls.run_experiment+this.singleExperimentModel.get("master_pw"))},renderUsers:function(){this.$el.find("#users").html(Handlebars.templates.users({user:this.UserCollection.toJSON()}))},generateUser:function(){var e=this;this.UserModel.set({nr_users:1}),this.UserModel.save(null,{success:function(t,n){e.fetchUsers()},error:function(e,t){console.log(t.responseText)}})},dataExport:function(){console.log("export data"),window.open(app.urls.csv_text_data+app.getExperimentId())}}),window.location.pathname.startsWith("/experiment/")&&new app.ExperimentView,app.NewExperimentView=Backbone.View.extend({el:$("#new-experiment"),events:{"click #add-measurement":"addMeasurement","click #save-experiment":"saveExperiment"},initialize:function(){var e=this;this.groupsModel=new app.GroupsModel,this.groupsModel.fetch({success:function(t){e.renderForm()},error:function(e){console.log("Die Gruppen konnten nicht geladen werden")}}),this.measurementCollection=new app.MeasurementCollection,this.measurementModel=new app.MeasurementModel,this.experimentModel=new app.ExperimentsModel,this.listenTo(this.measurementModel,"change",this.modelChanged),this.measurements={1:0,2:0,3:0,4:0,5:0}},renderForm:function(){this.$el.find("#experiment-generator").html(Handlebars.templates["experiment-generator"]({group:this.groupsModel.toJSON()})),this.$el.find("select").material_select(),this.$el.find(".datepicker").pickadate({selectMonths:!0,selectYears:15,format:"yyyy-mm-dd"})},modelChanged:function(){this.measurementCollection.add(this.measurementModel.toJSON()),this.renderTable()},renderTable:function(){this.$el.find("#experiment-table").html(Handlebars.templates["measurements-table"]({measurement:this.measurementCollection.toJSON()}))},addMeasurement:function(){var e=this,t=this.$el.find("#form-group").val(),n=this.$el.find("#form-treatment").val(),i=this.$el.find("#form-date").val();this.measurements[t]+=1,""===i?Materialize.toast("Bitte füge noch ein Datum ein",4e3):this.measurementModel.set({experiment:"",publication:i,measure:e.measurements[t],nr_group:Number(t),instruction:"",group:n})},saveExperiment:function(){var e=this,t=this.$el.find("#experiment-name").val().trim();if(""===t)Materialize.toast("Bitte tragen Sie noch den Namen des Experiements ein",4e3);else{var n=new Set,i=new Set;this.measurementCollection.each(function(e){n.add(e.toJSON().nr_group),i.add(e.toJSON().measure)}),0===i.size?Materialize.toast("Bitte fügen Sie noch Messzeitpunkte ein.",4e3):(this.experimentModel.set({name:t,nr_measurements:i.size,nr_groups:n.size}),this.experimentModel.save(null,{success:function(t,n){e.saveMeasurements()},error:function(e,t){console.log(t)}}))}},saveMeasurements:function(){var e=this,t=this.measurementCollection.length;this.measurementCollection.each(function(n){n.url=app.urls.measurement+e.experimentModel.get("master_pw"),n.save(null,{success:function(e,n){t-=1,0==t&&(window.location=app.urls.dashboard)},error:function(e,t){console.log(t.responseText)}})})}}),"/new-experiment/"==window.location.pathname&&new app.NewExperimentView,app.SubjectLoginView=Backbone.View.extend({el:$("#subject-login"),events:{"submit form":"submit"},initialize:function(){},submit:function(){event.preventDefault();var e=this.$el.find("#username").val();tidyUsername=e.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/Ä/g,"ae").replace(/Ö/g,"oe").replace(/Ü/g,"ue").replace(/ß/g,"ss").toLowerCase();var t=/^([a-z]{2,4}(0[1-9]|1[012])[a-z]{2,4})$/;if(6==e.length&&t.test(tidyUsername)){var n=app.getCookie("csrftoken");$.ajax({beforeSend:function(e,t){!app.csrfSafeMethod(t.type)&&app.sameOrigin(t.url)&&e.setRequestHeader("X-CSRFToken",n)},type:"POST",url:window.location.href,data:{username:tidyUsername},success:function(e){window.location=app.urls.run_experiment+app.getExperimentId()},error:function(e){console.log(e.responseText),Materialize.toast(e.responseText,4e3)}})}else Materialize.toast("Ihr Nutzername entspricht nicht dem Muster.",4e3)}}),window.location.pathname.startsWith("/login-experiment")&&new app.SubjectLoginView;
//# sourceMappingURL=app.js.map