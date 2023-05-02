// đối tượng app

const audio = document.querySelector('#audio')
const headerName = document.querySelector('.header.name')
const headerSingle = document.querySelector('.header.single')
const anh = document.querySelector('.cd-thumb')
 
const btnTogglePlay = document.querySelector('.btn-toggle-play')
const player = document.querySelector('.player')
const nextBtn = document.querySelector('.btn-next')
const backBtn = document.querySelector('.btn-prev')
const repeatBtn = document.querySelector('.btn-repeat')
const iconRepeat = document.querySelector('.icon-repeat')

const randomBtn = document.querySelector('.btn-random')
const app = {
    songs  : [
        {
            name :'bài hát 1' ,
            single : ' ca sĩ 1  ',
            image :'/assets/img/ct2.jpg',
            path:'/assets/font/because.mp3'

        },
        {
            name :'bài hát 2' ,
            single : ' ca sĩ 2  ',
            image :'/assets/img/ct3.jpg',
            path:'/assets/font/crush.mp3'

        },
        {
            name :'bài hát 3' ,
            single : ' ca sĩ 3  ',
            image :'/assets/img/ct4.jpg',
            path:'/assets/font/cuuhovi.mp3'

        },
        {
            name :'bài hát 4' ,
            single : ' ca sĩ 4  ',
            image :'/assets/img/ct5.jpg',
            path:'/assets/font/emcuangayhomqua.mp3'

        },
        {
            name :'bài hát 5' ,
            single : ' ca sĩ 5  ',
            image :'/assets/img/ct6.jpg',
            path:'/assets/font/gaclaiaulo.mp3'

        }



    ],
    currentIndex:0,
    isRepeat:false,
    isRandom : false,
    loadSong:function(){
      
        const vitridautien = app.songs[app.currentIndex] ;
        headerName.textContent = vitridautien.name 
        headerSingle.textContent = vitridautien.single
        var img = vitridautien.image 
        anh.style.backgroundImage = ` url('${img}')`
        audio.src = `${vitridautien.path}`
    },
    render:function(){
        const playlist = document.querySelector('.playlist');
        console.log(playlist)
        const htmls = this.songs.map(function(baihat){
          
            return `
            <div class="song">
                    <div class="thumb" style="background-image: url('${baihat.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${baihat.name}</h3>
                    <p class="author">${baihat.single}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
            </div>
           

            
            
                  `

        })
         playlist.innerHTML = htmls.join('')

    },
    isPlaying:false,
    
   handleEvents : function () {
      

        btnTogglePlay.onclick = function () {
          if(app.isPlaying ===true) {
            player.classList.remove('playing');
            app.isPlaying = false 
            audio.pause();
          }else{
            player.classList.add('playing')
            app.isPlaying = true 
            audio.play();
          }
          
        }
        //khi audio được phát thì chạy vào đây

        const progress = document.querySelector('input[type="range"]') 
        // đây là 1 cách khác để lấy ra thẻ input thôi
        // có thể lấy theo class cũng được
        // hàm này sẽ chạy khi bài hát được phát
        audio.ontimeupdate =function () {
        
            // lấy ra tổng số giây của bài hát
            const duration = audio.duration

           
            if(audio.currentTime){
                //bình thường mới bắt đầu bài hát thì audio.currentTime === NAN
                // nên ta phải kiểm tra rằng không có NAN thì mới chạy đoạn này
                // đặt 1 biến progressPercent = số giây đang được phát hiện tại(audio.currentTime)
                // chia cho tổng số giây mà bài hát có rồi nhân với 100 thì ra được phần trăm 
                // ví dụ đang hát được 5 giây 
                // mà bài hát có 100 giây
                // thì ta tính 5 giây của bài hát(có 100 giây) là được bao nhiêu phần trăm
                //ví dụ 5 giây của 1 bài hát 100 giây là 2%
                // thì ta lấy giá trị 2 này gán ngược vào thuộc tính value trong thẻ input kia
                // nhưng vì audio.currentime nó sẽ không trả về số nguyên 
                // ví dụ như 1 2 3 4 ...
                // mà nó trả về kiểu 0 ,38923933;1,372388383 ;2,2883993 ...
                // nên là khi chia cho tổng số giây của bài hát và nhân với 100
                //thì nó sẽ trả về số như kiểu 2,4484484 ; hoặc 5,693939 hoặc vv
                // nên trước khi gán vào biến chúng ta phải làm tròn nó
                // hàm Math . floor để làm tròn xuống
                //ví dụ 0.9 nó làm trong = 0 ;
                //1.5 làm tròn bằng 1
                //chúng ta nhận được biến progressPercent là 1 số nguyên
                //rồi cúng ta gán vào thẻ input có thuộc tính là value
                const progressPercent  = Math.floor( audio.currentTime / duration * 100 );
                progress.value = progressPercent 
            }

        }
        // khi chúng ta tua

        
        progress.onchange = function(e) {
            console.log(progress.value) // 18%
           // lấy giá trị ở chỗ tua
           const progressValue = e.target.value;//lấy được phần trăm của bài hát khi tua
           const duration = audio.duration // lấy số giây của bài hát

           //từ phần trăm bài hát lấy ra được số giây
           const currenDuration = progressValue /100 * duration // chỗ này tư duy xíu là đc
           console.log(currenDuration)
           // ví dụ bài hát có 400 giây 
           // mà ta có 15% 
           //thì 15% của 400s sẽ là 15/100* 400
           //kết quả sẽ là số giây đó
           // bây giờ gán ngược số giây này vào audio
           //những thuộc tính này a tra gg sẽ rõ
          audio.currentTime = currenDuration 
          e.target.value = progressValue

        }
        // khi next 
        
        nextBtn.onclick = function () {
            if(app.isRandom) {
                let random = Math.floor(Math.random()*app.songs.length)
                app.currentIndex = random
            }
            app.currentIndex ++ ; // lấy ra vị trí của bài hát hiện tại cộng thêm 1 
            console.log(app.currentIndex)
            if(app.currentIndex >= app.songs.length ){
                //nếu mà vị trí của bài hát đến  cuối của mảng thì chúng ta phải 
                // cho bằng 0 để phát lại từ đầu
                app.currentIndex = 0 
            }
            if(app.isPlaying){
                // nếu mà bài hát trươc đang được hát thì khi chuyển bài cũng cho hát luôn
                audio.play()
            }
            // đặt lại tên bài hát ca sĩ cái src của thẻ audio
            // như ở chỗ load songs
            headerName.textContent = app.songs[app.currentIndex].name
            headerSingle.textContent =app.songs[app.currentIndex].single
            const linkAnh = app.songs [app.currentIndex].image
            anh.style.backgroundImage = `url('${linkAnh}')`
            audio.src = `${app.songs[app.currentIndex].path}`
           



        }
        backBtn.onclick = function () {

            if(app.isRandom) {
                let random = Math.floor(Math.random()*app.songs.length)
                if(random === app.currentIndex) {
                    random = Math.floor(Math.random()*app.songs.length)
                    
                }
                app.currentIndex = random
    
                
            }
            app.currentIndex -- ; // lấy ra vị trí của bài hát hiện tại trừ thêm 1 
            if(app.currentIndex <0 ){
                //nếu mà ở vị trí đầu tiên thì 
                // cho bằng thằng cuối cùng của mảng để phát 
                app.currentIndex = app.songs.length -1 
            }
            // đặt lại tên bài hát ca sĩ cái src của thẻ audio
            // như ở chỗ load songs
            headerName.textContent = app.songs[app.currentIndex].name
            headerSingle.textContent =app.songs[app.currentIndex].single
            const linkAnh = app.songs [app.currentIndex].image
            anh.style.backgroundImage = `url('${linkAnh}')`
            audio.src = `${app.songs[app.currentIndex].path}`
            if(app.isPlaying){
                // nếu mà bài hát trươc đang được hát thì khi chuyển bài cũng cho hát luôn
                audio.play()
            }

        }
       
        repeatBtn.onclick = function(e) {
            // thêm class active cho nó để nó biến thành màu đỏ
            app.isRepeat = ! app.isRepeat
            // câu lệnh này có ngĩa là đặt cái isRepeat bằng cái phủ định của giá trị của nó
            // ví dụ nó đang bằng false thì sẽ thành true
            // và true thì nó thành false
            // chỗ này không dùng e.target được vì e.target nó sẽ trả về thẻ i
            // mà chúng ta muốn thêm class active vào thẻ button
            // nên sẽ dùng this
            //e.target vẫn được nhưng phải là e.target.parentElement thì mới được
            //thay vào đó dùng this cho nhanh
            this.classList.toggle('active',app.isRepeat) // khi true thì thêm class active 
            //khi false thì gỡ bỏ class active
        }

        randomBtn.onclick = function () {
            app.isRandom = ! app.isRandom
            this.classList.toggle('active',app.isRandom) // khi true thì thêm class active 


        }
        //khi hết bài hát
        audio.onended = function (){
           
            // nhưng trước tiên kiểm tra nó có được nhấn vào nút phát lại không 
            if(app.isRepeat){
                //nêu được nhấn thì cho phát lại
                audio.play()

            }else{
            // có thể app.currentIndex ++
            //nhưng làm luôn thế này kết quả cũng tương tự 
            //hàm này có nghĩa chúng ta tự click vào nút next
            // và khi chúng ta click vào nút next thì hàm nextBtn.onclick ở trên lại được chạy

                  nextBtn.click()



            }
        }


        //còn nút random logic cũng như vậy nhá a
        // gợi ý 
        // a dùng Math.random() nhân với độ dài của mảng và dùng math.floor() để làm tròn dưới
        // gợi ý Math.floor(Math.random()*app.songs.length)
        // chỗ này anh gán bằng biến app.currentIndex =Math.floor(Math.random()*app.songs.length)
        // rồi a gán nội dung bài hát ca sĩ ảnh và src của audio bằng mảng ở vị trí currentIndex là được


    
    
    },
    start:function(){
        app.loadSong();
        app.render()
        app.handleEvents()  

    }




}
// viết thế này cho ngắn gọn . đỡ phải gọi nhiều hàm cùng 1 lúc 
app.start()










