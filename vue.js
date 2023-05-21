let app = new Vue({
    el: "#app",
    data: {
      api: [],
      apiEvent: [],
      add: 0,
      del: 0,
      pop: "",
      ed: 0,
      name: null,
      eventPers: 0,
      year: 0,
      born: null,
      edd: 1,
      scrollY: window.scrollY,
	  windowWidth: window.innerWidth,
	  windowHeight: window.innerHeight,
	  personsOffset: 0,
	  bottomYear: null
    },
    computed: {
      sp() {		
        return this.api
          .sort((a, b) => (Number(a.born) > Number(b.born)) ? -1 : 1)
          .filter(p => 4026 - p.born + Number(p.age) > this.scrollY - 150)
		  .splice(this.personsOffset, this.visiblePersonsCount)
      },
	  availablePersons(){
		return available = this.api
          .filter(p => 4026 - p.born + Number(p.age) > this.scrollY - 150)
		  .filter(p => p.born > this.bottomYear)
	  },
	  visiblePersonsCount(){
		  return Math.round((this.windowWidth - 80) / 40)
	  },
	  rightPersons(){
		  return this.availablePersons.length - this.personsOffset - this.visiblePersonsCount
	  }
    },
    methods: {
      get() {
        post("api/get.php", null, (msg) => {
          this.api = JSON.parse(msg);
        });
      },
      yearDon(){
        for(i=0; i<=402; i++){
            this.year = this.year + [i] + ' '
        }
        this.year = this.year.split(' ').reverse()
        this.year[0] = 402
      },
      getEvent() {
        post("api/get-event.php", null, (msg) => {
          this.apiEvent = JSON.parse(msg); 
        });
      },
      send($event) {
        let fd = new FormData($event.target);
        post("api/add.php", fd, (msg) => {
          this.api.push(JSON.parse(msg));
          $event.target.reset();
          alert("Добавлен персонаж!");
          location.reload();
          this.add = 0;
        });
      },
      sendEvent($event) {
        let fd = new FormData($event.target);
        post("api/add-event.php", fd, (msg) => {
          this.apiEvent.push(JSON.parse(msg));
          $event.target.reset();
          alert("Добавлено событие!");
          this.add = 0;
        });
      },
      deletePers(id, index) {
		if (confirm('Вы точно хотите удалить этого персонажа?')){
          let fd = new FormData();
          fd.append("id", id);
          post("api/delete.php", fd, (msg) => {
            this.api = this.api.filter(pers => pers.id !== id);
          });
          alert("Удалено!");
		}
      },
      deleteEvent(id, index) {
        if(confirm("Вы точно хотите удалить это событие?")){
          let fd = new FormData();
          fd.append("id", id);
          post("api/delete-event.php", fd, (msg) => {
            this.apiEvent.splice(index, 1);
          });
          console.log(index);
          alert("Удалено!");
        }
      },
      getIn(id, index) {
        location.href="#popup"
        this.pop = this.api.findObjectByValue("id", id);
        this.edd = 1
      },
      getInEvent(id, index) {
        location.href="#popup"
        this.pop = this.apiEvent.findObjectByValue("id", id);
        this.edd = 2
      },
      updatePers(id, $event) {
        let fd = new FormData();
        fd.append("id", id);
        fd.append("value", $event.target.value);
        fd.append("input", $event.target.name)
        console.log(id, $event.target.name);
        post("api/update.php", fd, (msg) => {});
      },
      updateEvent(id, $event) {
        let fd = new FormData();
        fd.append("id", id);
        fd.append("value", $event.target.value);
        fd.append("input", $event.target.name)
        console.log(id, $event.target.name);
        post("api/update-event.php", fd, (msg) => {});
      },
      svp(){
        this.personsOffset++
      },
      svp2(){
        this.personsOffset = this.personsOffset > 0 ? this.personsOffset-1 : 0
      },
	  onResize(){
		this.windowWidth = window.innerWidth
		this.scrollY = window.scrollY 
		this.bottomYear = 4026 - (this.scrollY - document.querySelector('.flex').offsetTop + window.innerHeight)
	  }
    },
    mounted() {
      this.get();
      this.getEvent();
      this.yearDon();
	  this.onResize();
      this.$nextTick(() => {
        window.addEventListener('scroll', () => {
			this.scrollY = window.scrollY 
			this.bottomYear = 4026 - (this.scrollY - document.querySelector('.flex').offsetTop + window.innerHeight)
		})
		window.addEventListener('resize', this.onResize)
		window.addEventListener('swiperight', ()=> {
			console.log('left')
			this.personsOffset = this.personsOffset > 0 ? this.personsOffset-1 : 0
		})
		window.addEventListener('swipeleft', ()=> {
			console.log('right')
			this.personsOffset++
		})
      });
    },
  });