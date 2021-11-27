<template>
  <main id="chat-area">
    <div id="chat-area-name">
      <div># {{ this.$route.params.name }} chat room</div>
    </div>

    <div id="messages">
      <div class="message" v-for="message in messages" :key="message['id']">
        <img src="@/assets/images/icons/avatar.png" alt="image">
        <div class="author-content">
          <div class="author">{{ message['name_in_forum'] }}</div>
          <div class="content" v-for="content in message['contents']" :key="content['id']">
            {{ content['content'] }}
          </div>
        </div>
      </div>
    </div>

    <form>
      <input  type="text" name="new_message" placeholder="Type in your message">
      <i id="btn-send" class="fas fa-paper-plane"></i>
    </form>
  </main>
</template>

<script>
export default {
  name: 'ChatArea',
  data() {
    return {
      messages: [
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
        {
          'user_id': 2,
          'name_in_forum': 'Lý Huy Lanh',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
          ]
        },
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
        {
          'user_id': 31,
          'name_in_forum': 'Straw',
          'contents': [
            {'id': 1, 'content': 'Arcane: Jinx, Vi, Jayce, Ekko'},
            {'id': 2, 'content': 'Hell Bound'},
            {'id': 3, 'content': 'Kimetsu no Yaiba'},
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#chat-area {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 7rem 1rem 2rem;
  border-radius: 2rem;
  background: white;
  flex-grow: 1;
  padding: 5rem 3rem 3rem;

  #chat-area-name {
    position: absolute;
    top: 1rem;
    div {
      text-transform: capitalize;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  #messages {
    //display: flex;
    //flex-direction: column-reverse;
    //justify-content: start;
    max-height: 73vh;
    overflow-y: scroll;

    .message {
      display: flex;
      align-items: flex-end;
      margin-bottom: 1rem;

      .author-content {
        .author {
          color: #636e72;
          margin-left: 1.5rem;
        }
        .content {
          width: fit-content;
          font-size: 1.2rem;
          background: whitesmoke;
          padding: 0.5rem 1.5rem;
          border-radius: 1.5rem;
          margin-bottom: 0.3rem;
        }
      }

      img {
        width: 4rem;
        margin-right: 2rem;
      }
    }
  }

  form {
    @include flex-center;
    justify-content: space-around;
    border-radius: 2rem;
    border: 1px solid black;
    padding: 0.3rem;

    background: rgba(245, 245, 245, 0.6);
    input {
      width: 90%;
      display: inline;
      margin-right: 2rem;
      border: none;
      font-size: 1.2rem;
      background: rgba(245, 245, 245, 0.6);
    }
    input:focus {
      outline: none;
    }

    #btn-send {
      font-size: 2rem;
    }
    #btn-send:hover {
      color: rgba(50, 63, 76, 0.68);
      cursor: pointer;
    }
  }
}
</style>
